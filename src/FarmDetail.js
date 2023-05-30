import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TableRow from './TableRow'
import AddABedForm from './AddABedForm'

function FarmDetail({allFarms, setAllFarms}) {

    let {id} = useParams()
    id = parseInt(id)
    let navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const farm = allFarms.find((f) => f.id === id)
    let tableRowComps = []
    let bedsTable;

    if (farm) {
        tableRowComps = farm.beds.map(
            (bed) => <TableRow key={bed.id} bed={bed} allFarms={allFarms} setAllFarms={setAllFarms}/>)
        if (tableRowComps.length === 0) {
            bedsTable = null
        } else {
            bedsTable = 
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
                        {tableRowComps}
                    </tbody>
                </table>
        }
    }

    if (!farm) {
        return <p className="alert warning">Loading...</p>;
      }

    function handleFormVis() {
        setShowForm(!showForm)
    }

    function onDeleteFarm(){
        fetch(`http://localhost:9292/farms/${id}`, {
            method: "DELETE"
        })
        .then(setAllFarms([...allFarms].filter(f => f.id !== id)))
        .then(navigate('/farms'))
    }

    return(
        <div className="farm-detail-container">
            <div className="farm-detail">
                <div className="farm-name-location">
                    <h2>{farm.name}</h2>
                    <p>{`City: ${farm.city}`}</p>
                    <p>{`State: ${farm.state}`}</p>
                </div>
                
                <div className="button-container">
                    <a id="edit-farm-button" href={`/farms/${id}/edit`}>
                        <button>Edit {farm.name}</button>
                    </a>
                </div>

                <div className="button-container">
                    <button onClick={onDeleteFarm} className="delete">Delete {farm.name}</button>
                </div>

                <div className="button-container">
                    <button onClick={handleFormVis}>{showForm ? "Close Bed Form" : "Add a Bed"}</button>
                </div>
                
                {showForm ? <AddABedForm allFarms={allFarms} setAllFarms={setAllFarms}/> : null}
                
                <div className="add-farm-form-container">
                    {farm ? bedsTable : "Loading..."}
                </div>
            </div>
        </div>
    )
}

export default FarmDetail