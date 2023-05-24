import React from 'react'

function FarmCard({farm}) {

    const {
        id,
        name,
        city,
        state
    } = farm

    return(
        <div id="farm-card">
            <a href={`/farms/${id}`}>
                <h3>{name}</h3>
                <p>{city}, {state}</p>
            </a>
        </div>
    )
}

export default FarmCard