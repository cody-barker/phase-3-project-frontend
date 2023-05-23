import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

function FarmDetail({allFarms, setAllFarms}) {

    let {id} = useParams()
    id = parseInt(id)

    const farm = allFarms?.find((f) => f.id === id)

    console.log(farm)

    if (!farm) {
        return <p className="alert warning">Not found</p>;
      }

    return(
        <div>
            <h2>{farm.name}</h2>
            <p>{`City: ${farm.city}`}</p>
            <p>{`State: ${farm.state}`}</p>
        </div>
    )
}

export default FarmDetail