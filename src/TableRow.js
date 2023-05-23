import React from 'react'

function TableRow({bed, allFarms, setAllFarms}) {

    const {
        id,
        sq_ft,
        crop,
        dtm,
        planting_date,
        harvest_date
    } = bed

    let updatedFarms = [...allFarms]

    function onDelete(){
        fetch(`http://localhost:9292/beds/${id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(deletedBed => {
            for (let i=0; i < allFarms.length; i++){
                updatedFarms[i].beds = updatedFarms[i].beds.filter(bed => bed.id !== deletedBed.id)
            }
            setAllFarms(updatedFarms)
        })
    }


    return(
        <tr>
            <td>{id}</td>
            <td>{sq_ft}</td>
            <td>{crop}</td>
            <td>{dtm}</td>
            <td>{planting_date}</td>
            <td>{harvest_date}</td>
            <td>
                <button onClick={onDelete} className="delete">Delete</button>
            </td>
        </tr>
    )
}

export default TableRow