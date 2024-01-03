import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import EXIF from 'exif-js';


export default function RecordEditForm(props) {
  const [newRec , setNewRec] = useState([]);
  useEffect(() => {
    //call API
    loadSpeciesList(); 
       
},[]);
//for record form
const loadSpeciesList = () => {
  Axios.get("species/index", props.passToken)
  .then((response) => {
  console.log(response);
  setNewRec(response.data.newRec);
  })
  .catch((error) => {
  console.log(error);
  })
  };

  const [newUpd , setNewUpd] = useState({});

  const[newLat, setNewLat] = useState("");
  const[newLong, setNewLong] = useState("");
  const [url, setUrl] = useState("");

  const handleUpdChange = (event) => { 
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const recordUpd = {...newUpd};
    recordUpd[attributeToChange] = newValue;
    console.log(recordUpd);
    setNewUpd(recordUpd);
} 

const [selectSpecies , setSelectSpecies] = useState("");
const [selectedSpeciesInfo , setSelectedSpeciesInfo] = useState();

const handleRecordUpd = (event) => { 
  const attributeToChange = event.target.name;
  const newRecUpd = event.target.value;

  setSelectSpecies(newRecUpd);

  const updRecord = {...newRecUpd};
  updRecord[attributeToChange] = newRecUpd;
  console.log(updRecord);
  setNewUpd(updRecord);
  speciesView(newRecUpd);

}

const handleSubmit = (event)=>{
  event.preventDefault();
  const updRecord = {...newUpd}


  const ImageLink = "image";
  updRecord[ImageLink] = url;
  setNewUpd(updRecord);
  console.log(updRecord);

  props.addUpdRecord(updRecord)
}

const speciesView = (id) => {
  Axios.get(`species/detail?id=${id}`, props.passToken)
  .then( ( res ) => {
      console.log("Loaded Species Info");
      console.log(res.data.species);
      //let specie = res.data.species;
  
      setSelectedSpeciesInfo(res.data.species);
  
  })
  .catch((error) => {
      console.log("Error loading Recipe Information: ");
      console.log(error);
  })

  
  }
const [formData, setFormData] = useState({image: null});

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}
  return (
    <div className="container py-1 mb-5">
      <h1> Update Record </h1>
      <div  className="row g-5">
        
        <div className="col-md-6 col-lg-6">

          <form onSubmit={handleSubmit} autoComplete="off">


            <div className="mb-3 pb-1">
                <label htmlFor="user" className="form-label">Records :</label>
            <select id="user" name="user" className="form-select" onChange={handleUpdChange} required>
              <option value="" selected disabled>Select a Record</option>
            </select>
        </div>
        <div className="mb-3 pb-1">
            <label htmlFor="time" className="form-label">Time :</label> 
            <input type="time" className="form-control" id="time" name="time" onChange={handleRecordUpd} required/>
            </div>

            <div className="mb-3 pb-1">
            <label htmlFor="date" className="form-label">Date : </label> 
            <input type="date" className="form-control" id="date" name="date" onChange={handleRecordUpd} required/>
            </div>

              <div className='row g-3'>
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="locationLongitude" className="form-label">Longitude :</label>
                    <input type="number" className='form-control' id="locationLongitude" name="locationLongitude" value={newLong} onChange={handleRecordUpd} required readonly/>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="locationLatitude" className="form-label">Latitude :</label>
                    <input type="number" className='form-control' id="locationLatitude" name="locationLatitude" value={newLat} onChange={handleRecordUpd} required readonly/>
                </div>
            </div>

            <div className="col-sm">
                <div className="mb-3 pb-1">
                    <label htmlFor="location" className="form-label">Location :</label>
                    <input type="location" className='form-control' id="location" name="location" value={newLat} onChange={handleRecordUpd} required readonly/>
                </div>
            </div>
            
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity :</label>
                    <input type="quantity" className='form-control' id="location" name="location" value={newLat} onChange={handleRecordUpd} required readonly/>
                </div>
      
        </div>

            <div className="mb-3">
                <label htmlFor="notes" className="form-label"> Note:</label>
                <textarea className="form-control" id="notes" name="notes" value={formData.note} onChange={handleRecordUpd}></textarea>
            </div>



            <div className="mb-3 pb-1">
                <button onClick={ () => props.setIsEditRecord(false) } className="btn btn-secondary me-2">Cancel</button>
                <input className='btn btn-primary' type="submit" value="Add Record" />
            </div>
      </form>
</div>
      </div>
      <div>
                {selectSpecies}<br />
                { selectedSpeciesInfo ? JSON.stringify(selectedSpeciesInfo) : "" } 
            </div>
    </div>
  )
}



