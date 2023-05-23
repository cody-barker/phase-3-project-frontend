import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function EditFarm({allFarms, setAllFarms}) {

    let {id} = useParams()
    id = parseInt(id)
    let navigate = useNavigate()

    const farm = allFarms?.find((f) => f.id === id)

    const [inputState, setInputState] = useState({
        farmName: "",
        farmCity: "",
        farmState: "",
        render: 1
    })

    const {
        farmName,
        farmCity,
        farmState,
        render
    } = inputState

    const updatedFarm = {
        name: farmName,
        city: farmCity,
        state: farmState,
    }

    if (farm && render === 1) {
        setInputState({
            ...inputState,
            farmName: farm.name,
            farmCity: farm.city,
            farmState: farm.state,
            render: 2
        })
    }

    function onInputChange(e) {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    function onUpdateFarm(e) {
        e.preventDefault()
        fetch(`http://localhost:9292/farms/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(updatedFarm)
        })
        .then(r => r.json())
        .then(patchedFarm => {
            const updatedFarms = allFarms.map(f => {
                if (f.id === id) {
                    return patchedFarm
                } else {
                    return f
                }
            })
            setAllFarms(updatedFarms)
        })
        .then(navigate(`/farms/${id}`))
    }

    if (!farm) {
        return <p className="alert warning">"Loading..."</p>;
      }

    return(
        <div>
            <h3>Edit {farm.name}</h3>
            <div className="update-a-farm-container">
                <form onSubmit={onUpdateFarm}>
                    <label>
                        Farm Name
                        <input 
                            onChange={onInputChange}
                            name="farmName"
                            value={farmName}
                            type="text">
                        </input>
                    </label>

                    <label>
                        City
                        <input 
                            onChange={onInputChange}
                            name="farmCity"
                            value={farmCity}
                            type="text">
                        </input>
                    </label>

                    <label>
                        State
                        <input 
                            onChange={onInputChange}
                            name="farmState"
                            value={farmState}
                            type="text">
                        </input>
                    </label>

                    <button className="update-btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditFarm