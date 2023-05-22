import React from 'react'
import { Link } from 'react-router-dom'

function Farms({allFarms, setAllFarms}) {

    const farmLinks = allFarms.map(farm => <Link to={`/farms/${farm.id}`} key={farm.id}>{farm.name}</Link>)

    return(
        <div>
            <h1>Farms</h1>
            {farmLinks}
        </div>
    )
}

export default Farms