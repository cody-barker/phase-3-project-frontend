import React, {useState} from 'react'
import FarmCard from './FarmCard'

function Farms({allFarms, setAllFarms}) {

    const farmCards = allFarms.map(farm => <FarmCard key={farm.id} farm={farm}/>)

    const [inputState, setInputState] = useState({
        farmName: "",
        farmCity: "",
        farmState: ""
    })

    const {
        farmName,
        farmCity,
        farmState
    } = inputState

    let newFarm = {
        name: farmName,
        city: farmCity,
        state: farmState,
    }

    function onInputChange(e) {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    function onAddFarm(e) {
        e.preventDefault()
        fetch('http://localhost:9292/farms', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newFarm)
        })
        .then(r => r.json())
        .then(newFarm => {
                setAllFarms([...allFarms, newFarm])
                setInputState({
                    ...inputState, 
                    farmName:"",
                    farmCity:"",
                    farmState:""})}
        )
    }

    return(
        <div className="farms-container">
            <div className="farm-cards-container">
                <h1>Farms</h1>
                {farmCards}
            </div>
            <div className="add-a-farm-container">
                <h2>Add a Farm</h2>
                <form onSubmit={onAddFarm}>

                    <label>
                        Farm Name
                        <input
                            required
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

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Farms