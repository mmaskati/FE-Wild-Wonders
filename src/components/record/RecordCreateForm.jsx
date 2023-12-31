import React, { useState } from 'react'

export default function RecordCreateForm(props) {

    const [newRecord , setnewRecord] = useState({})
    const handleChange = (event) => { 
        const attributeToChange = event.target.name;
        const newValue = event.target.value;

        const record = {...newRecord};
        record[attributeToChange] = newValue;
        console.log(record);
        setnewRecord(record);
    } 

    const handleSubmit = (event)=>{
        event.preventDefault();
        props.addRecord(newRecord)
    }


  return (
    <div>
        <h1>Create Record</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Species</label>
                <input type="text" className='form-control' name="species" onChange={handleChange}></input>
            </div>

            <div>
                <label>Date</label>
                <input type="text" className='form-control' name="date" onChange={handleChange}></input>
            </div>

            <div>
                <label>Location</label>
                <input type="text" className='form-control' name="location" onChange={handleChange}></input>
            </div>

            <div>
                <label>Location Longatittude</label>
                <input type="text" className='form-control' name="locationLongitude" onChange={handleChange}></input>
            </div>

            <div>
                <label>Location Latittude</label>
                <input type="text" className='form-control' name="locationLatitude" onChange={handleChange}></input>
            </div>


            

            <div>
                <input className='btn btn-primary' type="submit" value="Add Record" />
            </div>

        </form>
    </div>
  )
}
