import React, { useState } from "react";
import { useQuery } from "react-query";
import Planetcard from "./Planetcard";


const fetchPlanets = async (key) => {   
    console.log(key)
    const res = await fetch(`http://swapi.dev/api/planets/?page=${key}`);
    return res.json();
}


const Planets= () => {
    const [ page, setPage ] = useState(1);
    const { data,status } = useQuery(['planets', page], () => fetchPlanets(page));
    return(
    <div>
        <h2>Planets</h2>
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
            {data.results.map(planet => <Planetcard key={planet.name} planet={planet} />)}
        </div>}
    </div>
    );
}

export default Planets;