import React from 'react'
import { useParams } from 'react-router-dom'

function FarmDetail({farm}) {

    
    return(
        <div>
            {farm.name}
        </div>
    )
}

export default FarmDetail