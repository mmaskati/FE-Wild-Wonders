import React from 'react'
import { useState } from 'react';


export default function RecordEditForm(props) {
    console.log(props);
    const [newRecordList , setnnewRecordList] = useState(props.record)
    const handleChange = (event) => { 
        const attributeToChange = event.target.name;
        const newValue = event.target.value;

        const recordList = {...newRecordList};
        recordList[attributeToChange] = newValue;
        console.log(recordList);
        setnnewRecordList(recordList);
    } 

    const handleSubmit = (event)=>{
        event.preventDefault();
        props.updateRecord(newRecordList)
    }


return (
<div className="container py-1 mb-5">
    <h1>Edit Record for <span className="text-primary">{newRecordList.species.name}</span></h1>
    <form onSubmit={handleSubmit}>

    <div className="row g-5">

    <div className="col-md-7 col-lg-8">
        <div>
            {/* <label>Species: </label> */}
            <input type="hidden" value={newRecordList.species}  className="form-control" id="species" name="species" onChange={handleChange} readOnly="true" />
        </div>

        <div className="mb-3 pb-1">
            <label htmlFor="date" className="form-label">Date :</label>
            <input type="text" value={newRecordList.date} className="form-control" id="date" name="date" onChange={handleChange} />
        </div>

        {/* <div>
            <label>Time :</label>
            <input type="text"value={newRecordList.time}  className="form-control"
                name="time" onChange={handleChange}></input>
        </div> */}

        <div className="mb-3 pb-1">
            <label htmlFor="location" className="form-label">Location</label>
            <input type="text"value={newRecordList.location} className="form-control" id="location" name="location" onChange={handleChange}></input>
        </div>
    </div>
    <div className="col-md-5 col-lg-4">
        <div className="mb-3 pb-1">
            <label htmlFor="locationLongitude" className="form-label">Location Longitude :</label>
            <input type="text" value={newRecordList.locationLongitude} className="form-control" id="locationLongitude" name="locationLongitude" onChange={handleChange}></input>
        </div>

        <div className="mb-3 pb-1">
            <label htmlFor="locationLatitude" className="form-label">Location Latitude :</label>
            <input type="text"value={newRecordList.locationLatitude}  className="form-control" id="" name="locationLatitude" onChange={handleChange}></input>
        </div>


        <div className="mb-3 pb-1">
            <button onClick={ () => props.setIsEditRecord(false) } className="btn btn-secondary me-2">Cancel</button>
            <input className='btn btn-warning' type="submit" value="Edit Record" />
        </div>

        </div>
    </div>

    </form>
</div>
)
}
