import React from 'react'
import FarmLink from './FarmLink'

function Farms({allFarms, setAllFarms}) {

    const farmLinks = allFarms.map(farm => <FarmLink key={farm.id} farm={farm}/>)

    return(
        <div>
            <h1>Farms</h1>
            {farmLinks}
        </div>
    )
}

export default Farms