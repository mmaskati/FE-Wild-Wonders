import React, { useState } from 'react';
// import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import EXIF from 'exif-js';
// import dayjs
import dayjs from "dayjs";
// import relativeTime plugin
import relativeTime from "dayjs/plugin/relativeTime";
// extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);
export default function RecordEditForm(props) {
// const [newRec , setNewRec] = useState(props.currentRecord);
//   useEffect(() => {
//     //call API
//     loadSpeciesList();
// },[]);
//for record form
// const loadSpeciesList = () => {
//   Axios.get("species/index", props.passToken)
//   .then((response) => {
//   console.log(response);
//   setNewRec(response.data.newRec);
//   })
//   .catch((error) => {
//   console.log(error);
//   })
//   };
  // const [newUpd , setNewUpd] = useState({});
const [record, setEditRecord] = useState(props.record);
const handleChangeRecord = (event) => {
  //define the attributes from the form you need
  const attributeToChange = event.target.name;
  //define the values for those attributes
  const editValue = event.target.value;
  const updatedRecord = {...record};
  updatedRecord[attributeToChange] = editValue;
  // console.log(updatedRecord);
  setEditRecord(updatedRecord);
}

const handleSubmitSpecies = (event) => {
    event.preventDefault();
    props.updateRecord(record);
    event.target.reset(); //clear the form
}
  // const[newLat, setNewLat] = useState("");
  // const[newLong, setNewLong] = useState("");
  // const [url, setUrl] = useState("");
//   const handleChangeRecord = (event) => {
//     const attributeToChange = event.target.name;
//     const newValue = event.target.value;
//     const record = {...newRecord};
//     record[attributeToChange] = newValue;
//     console.log(record);
//     setnewRecord(record);
// }
// const [selectSpecies , setSelectSpecies] = useState("");
// const [selectedSpeciesInfo , setSelectedSpeciesInfo] = useState();
// const handleRecordUpd = (event) => {
//   const attributeToChange = event.target.name;
//   const newRecUpd = event.target.value;
//   setSelectSpecies(newRecUpd);
//   const updRecord = {...newRecUpd};
//   updRecord[attributeToChange] = newRecUpd;
//   console.log(updRecord);
//   setNewUpd(updRecord);
//   speciesView(newRecUpd);
// }
// const handleSubmit = (event)=>{
//   event.preventDefault();
//   const record = {...newRecord};
//   setnewRecord(record);
//   console.log(record);
//   props.updateRecord(record)
// }
// const speciesView = (id) => {
//   Axios.get(`species/detail?id=${id}`, props.passToken)
//   .then( ( res ) => {
//       console.log("Loaded Species Info");
//       console.log(res.data.species);
//       //let specie = res.data.species;
//       setSelectedSpeciesInfo(res.data.species);
//   })
//   .catch((error) => {
//       console.log("Error loading Recipe Information: ");
//       console.log(error);
//   })
//   }
// const [formData, setFormData] = useState({image: null});
// function ConvertDMSToDD(degrees, minutes, seconds, direction) {
//     var dd = degrees + minutes/60 + seconds/(60*60);
//     if (direction == "S" || direction == "W") {
//         dd = dd * -1;
//     } // Don't do anything for N or E
//     return dd;
// }

  return (
    <div className="container py-1 mb-5">
      <h4><FontAwesomeIcon icon="pencil" /> Update Record for sighted (<span className="text-primary">{props.record.species.name}</span>)</h4>
      <h5>Taken: {dayjs(props.record.date).format('YYYY-MM-DD HH:mm')}</h5>
      <p>Last Updated: <code>{dayjs(props.record.updatedAt).fromNow(true)}</code> ago</p>
      <br />
      <div className="row g-5">
        <div className="col-md-6 col-lg-6">
          <form onSubmit={handleSubmitSpecies} autoComplete="off">
            {/* <div className="mb-3 pb-1">
                <label htmlFor="user" className="form-label">Records :</label>
            <select id="user" name="user" className="form-select" onChange={handleChangeRecord} required>
              <option value="" selected disabled>Select a Record</option>
            </select>
        </div> */}
        {/* <div className="mb-3 pb-1">
            <label htmlFor="time" className="form-label">Time :</label>
            <input type="time" className="form-control" id="time" name="time" onChange={handleChangeRecord} required/>
            </div> */}
            {/* <div className="mb-3 pb-1">
            <label htmlFor="date" className="form-label">Date: </label>
            <input type="date" className="form-control" id="date" name="date" onChange={handleChangeRecord} required/>
            </div> */}
              <div className='row g-3'>
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="locationLongitude" className="form-label">Longitude</label>
                    <input type="number" className="form-control" id="locationLongitude" name="locationLongitude" value={record.locationLongitude} onChange={handleChangeRecord} readOnly/>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="locationLatitude" className="form-label">Latitude</label>
                    <input type="number" className="form-control" id="locationLatitude" name="locationLatitude" value={record.locationLatitude} onChange={handleChangeRecord} readOnly/>
                </div>
            </div>
            <div className="col-sm">
                <div className="mb-3 pb-1">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" name="location" value={record.location} onChange={handleChangeRecord} required />
                </div>
            </div>
                {/* <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity :</label>
                    <input type="text" className='form-control' id="quantity" name="quantity" value={record.quantity} onChange={handleChangeRecord} required readonly/>
 
 
              </div> */}
        </div>
            <div className="mb-3">
                <label htmlFor="notes" className="form-label">Note(s)</label>
                <input type="text" className="form-control" id="notes" name="notes" value={record.notes} onChange={handleChangeRecord} />
            </div>
            <div className="mb-3 pb-1">
                <button onClick={ () => props.setIsEditRecord(false) } className="btn btn-secondary me-2">Cancel</button>
                <input className='btn btn-warning' type="submit" value="Update Record" />
            </div>
      </form>
 
 
        </div>
      <div className="col-md-6 col-lg-6">
        <div>
              <img src={props.record.image} className="img-fluid" alt={props.record.species.name} />
        </div>
      </div>
      </div>
    </div>
  )
