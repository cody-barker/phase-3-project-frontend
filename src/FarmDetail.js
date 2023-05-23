import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import TableRow from './TableRow'
import AddABedForm from './AddABedForm'

function FarmDetail({allFarms, setAllFarms}) {

    let {id} = useParams()
    id = parseInt(id)
    let navigate = useNavigate()
    const farm = allFarms?.find((f) => f.id === id)
    let tableRowComps = []

    const [inputState, setInputState] = useState({
        sqFt: "",
        crop: "",
        dtm: "",
        plantingDate: "",
        harvestDate: "",
        showForm: false
    })

    const {
        sqFt,
        crop,
        dtm,
        plantingDate,
        harvestDate,
        showForm
    } = inputState

    const newBed = {
        farm_id: id,
        sq_ft: sqFt,
        crop: crop,
        dtm: dtm,
        planting_date: plantingDate,
        harvest_date: harvestDate
    }

    if (farm) {
        tableRowComps = farm.beds.map(
            (bed) => <TableRow key={bed.id} bed={bed} allFarms={allFarms} setAllFarms={setAllFarms}/>)
    }

    function handleFormVis(e){
        setInputState({
            ...inputState,
            showForm: !showForm
        })
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
                
                <a id="edit-farm-button" href={`/farms/${id}/edit`}>
                    <button>Edit {farm.name}</button>
                </a>
                <button onClick={onDeleteFarm} className="delete">Delete {farm.name}</button>
                

                <div className="buttonContainer">
                    <button onClick={handleFormVis}>{showForm ? "Close Bed Form" : "Add a Bed"}</button>
                </div>
                {showForm ? <AddABedForm allFarms={allFarms} setAllFarms={setAllFarms}/> : null}
                
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