import React from 'react'
import { Link } from 'react-router-dom'

function FarmLink ({farm}) {

    const {id, name} = farm

    return(
        <Link to={id}>{name}</Link>
    )
}

export default FarmLink