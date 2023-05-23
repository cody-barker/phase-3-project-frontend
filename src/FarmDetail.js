import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import TableRow from './TableRow'

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
        harvestDate: ""
    })

    const {
        sqFt,
        crop,
        dtm,
        plantingDate,
        harvestDate
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

    function onInputChange(e) {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
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

    function onAddABed(e) {
        e.preventDefault()
        fetch('http://localhost:9292/beds', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newBed)
        })
        .then(r => r.json())
        .then(newBed => {
            if (allFarms.find(farm => farm.id === id)) {
                const updatedFarms = allFarms.map(farm => {
                    if (farm.id === id) {
                        farm.beds.push(newBed)
                        return(farm)
                    } else {
                        return farm
                    }
                })
                setAllFarms(updatedFarms)
                setInputState({
                    ...inputState, 
                    sqFt: "",
                    crop: "",
                    dtm: "",
                    plantingDate: "",
                    harvestDate: ""})}
        })
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
                <div className="add-a-bed-container">
                <h2>Add a Bed</h2>
                <form onSubmit={onAddABed}>

                    <label>
                        Square Feet
                        <input
                            onChange={onInputChange}
                            name="sqFt"
                            value={sqFt}
                            type="number">
                        </input>

                    </label>
        
                    <label>
                        Crop
                        <input
                            onChange={onInputChange}
                            name="crop"
                            value={crop}
                            type="text">
                        </input>
                    </label>

                    <label>
                        Days to Maturity
                        <input
                            onChange={onInputChange}
                            name="dtm"
                            value={dtm}
                            type="number">
                        </input>
                    </label>

                    <label>
                        Planting Date
                            <input
                                onChange={onInputChange}
                                name="plantingDate"
                                value={plantingDate}
                                type="date">
                            </input>
                    </label>

                    <label>
                        Harvest Date
                        <input
                            onChange={onInputChange}
                            name="harvestDate"
                            value={harvestDate}
                            type="date">
                        </input>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
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