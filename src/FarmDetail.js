import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

function FarmDetail({allFarms, setAllFarms}) {

    const { id } = useParams()
   
    const [selectedFarm, setSelectedFarm] = useState({})

    useEffect(() => {
        fetch(`http://localhost:9292/farms/${id}`)
        .then(r => r.json())
        .then(farm => setSelectedFarm(farm))
    },[])

    


    return(
        <div>
            <p>{selectedFarm ? selectedFarm.name : "Loading...."}</p>
        </div>
    )
}

export default FarmDetail