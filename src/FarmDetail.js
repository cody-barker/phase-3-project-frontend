import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import TableRow from './TableRow'

function FarmDetail({allFarms, setAllFarms}) {

    let {id} = useParams()
    id = parseInt(id)
    let navigate = useNavigate()

    const farm = allFarms?.find((f) => f.id === id)

    let tableRowComps = []

    if (farm) {
        tableRowComps = farm.beds.map(
            (bed) => <TableRow key={bed.id} bed={bed} allFarms={allFarms} setAllFarms={setAllFarms}/>)
    }

    function onDeleteFarm(e){
        e.preventDefault()
        fetch(`http://localhost:9292/farms/${id}`, {
            method: "DELETE"
        })
        .then(setAllFarms([...allFarms].filter(f => f.id !== id)))
        .then(navigate('/farms'))


    }
            
    if (!farm) {
        return <p className="alert warning">Farm not found</p>;
      }

    return(
        <div>
            <div>
                <h2>{farm.name}</h2>
                <p>{`City: ${farm.city}`}</p>
                <p>{`State: ${farm.state}`}</p>
                <Link to={`/farms/${id}/edit`}>Edit Farm</Link>
                <button onClick={onDeleteFarm} className="delete">Delete This Farm</button>
            </div>
            <div>
            <table>
                <thead>
                    <tr>
                    <th>Bed #</th>
                    <th>Sq Ft</th>
                    <th>Crop</th>
                    <th>DTM</th>
                    <th>Planting Date</th>
                    <th>Harvest Date</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {!farm? "Loading" : tableRowComps}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default FarmDetail