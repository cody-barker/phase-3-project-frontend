import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

function FarmDetail({allFarms, setAllFarms}) {

    console.log("render")

    let {id} = useParams()
    id = parseInt(id)

    let farm = {}

    useEffect(() => {
        if (allFarms) {
            farm = ([...allFarms].find(f => f.id === id))
        }
        console.log(farm)
    }
    ,[allFarms])

    console.log(farm)
    console.log(allFarms)

    return(
        <div>
            <p>{farm.name}</p>
        </div>
    )
}

export default FarmDetail