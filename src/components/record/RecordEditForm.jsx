import React from 'react'
import { useState } from 'react';


export default function RecordEditForm(props) {
    console.log(props);
    const [newRecordList , setnnewRecordList] = useState(props.author)
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
        props.addRecordList(newRecordList)
    }


  return (
    <div>
        <h1>Edit Record List</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Species :</label>
                <input type="text" value={newRecordList.species}  className='form-control' 
                name="species" onChange={handleChange}></input>
            </div>

            <div>
                <label>Date :</label>
                <input type="text" value={newRecordList.date} className='form-control' 
                name="date" onChange={handleChange}></input>
            </div>

            <div>
                <label>Time :</label>
                <input type="text"value={newRecordList.time}  className='form-control'
                 name="time" onChange={handleChange}></input>
            </div>

            <div>
                <label>Location :</label>
                <input type="text"value={newRecordList.location}  className='form-control'
                 name="location" onChange={handleChange}></input>
            </div>
            <div>
                <label>Location Longitude :</label>
                <input type="text"value={newRecordList.locationLongitude}  className='form-control'
                 name="locationLongitude" onChange={handleChange}></input>
            </div>

            <div>
                <label>Location Latitude :</label>
                <input type="text"value={newRecordList.locationLatitude}  className='form-control'
                 name="locationLatitude" onChange={handleChange}></input>
            </div>


            <div>
                <input className='btn btn-primary'  type="submit" value="Add Record" />
            </div>

        </form>
    </div>
  )
}
