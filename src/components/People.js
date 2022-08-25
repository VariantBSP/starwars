import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";
import { useState } from "react";

const fetchPeople = async (key) => {   
    console.log(key)
    const res = await fetch(`http://swapi.dev/api/people/?page=${key}`);
    return res.json();
}

const People= () => {
    const [ page, setPage ] = useState(1);
    const { data,status } = useQuery(['planets', page], () => fetchPeople(page));

    return(
    <div>
       <h2>People</h2>
       <button 
            onClick={ () => setPage(old => Math.max(old-1,1)) }
            disabled={page===1}
        >Previous Page</button>
        <span>{page}</span>
        <button 
            onClick={() => setPage(old => Math.max(old+1,1)) }
            disabled={page===6}
        >Next Page</button>

       {status === "loading" && <p>Loading...</p>}
       {status === "error" && <p>Error fetching data</p> }
       {status === "success" && 
        <div>
            {data.results.map(person => <Person key={person.name} person={person} />)}
        </div>}
    </div>
    );
}

export default People;