import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import FarmCard from './FarmCard'

function Farms({allFarms, setAllFarms}) {

    //const farmLinks = allFarms.map(farm => <Link to={`/farms/${farm.id}`} key={farm.id}>{farm.name}</Link>)
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
            if (allFarms.find(farm =>
                    farm.name === newFarm.name))
                    {alert("This farm already exists and will not be added.")}
            else {
                setAllFarms([...allFarms, newFarm])
                setInputState({
                    ...inputState, 
                    farmName:"",
                    farmCity:"",
                    farmState:""})}
        })
    }

    function onInputChange(e) {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div>
            <h1>Farms</h1>
            {farmCards}
            <div className="add-a-farm-container">
                <h2>Add a Farm</h2>
                <form onSubmit={onAddFarm}>

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

export default Farms