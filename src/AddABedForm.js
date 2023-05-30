import React, {useState} from 'react'
import { useParams } from 'react-router-dom'

function AddABedForm({allFarms, setAllFarms}){

    let {id} = useParams()
    id = parseInt(id)

    const [inputState, setInputState] = useState({
        sqFt: "",
        crop: "",
        dtm: "",
        plantingDate: "",
        harvestDate: "",
    })

    const {
        sqFt,
        crop,
        dtm,
        plantingDate,
        harvestDate,
    } = inputState

    const newBed = {
        farm_id: id,
        sq_ft: sqFt,
        crop: crop,
        dtm: dtm,
        planting_date: plantingDate,
        harvest_date: harvestDate
    }

    function onInputChange(e) {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
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
            const updatedFarms = allFarms.map(farm => {
                if (farm.id === id) {
                    return {
                        ...farm,
                        beds: [
                            ...farm.beds, newBed
                        ]
                    }
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
        )
    }

    return(
        <form onSubmit={onAddABed}>

                    <label>
                        Crop
                        <input
                            required
                            onChange={onInputChange}
                            name="crop"
                            value={crop}
                            type="text">
                        </input>
                    </label>
                    
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
    )
}

export default AddABedForm