import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import EXIF from 'exif-js';

export default function RecordCreateForm(props) {

//the API call for Animals

// const request = require("request");
// var name = 'cheetah';
// request.get({
//     url: 'https://api.api-ninjas.com/v1/animals?name=' + name,
//     headers: {
//       'X-Api-Key': ''
//     },
//   }, function(error, response, body) {
//     if(error) return console.error('Request failed:', error);
//     else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
//     else console.log(body)
//   });

// let options = {
// method: 'GET',
// headers: { 'x-api-key': 'SaITidZ/aY3VXro/aa0biA==0e4EFYKwrghqStOC' }
// }

// let url = 'https://api.api-ninjas.com/v1/animals?name=cheetah'

// fetch(url,options)
// .then(res => res.json()) // parse response as JSON
// .then(data => {
//     console.log(data)
// })
// .catch(err => {
//     console.log(`error ${err}`)
// }); 

const [species, setSpecies] = useState([]);

useEffect(() => {
    //call API
    loadSpeciesList();    
},[]);

//for record form
const loadSpeciesList = () => {
Axios.get("species/index", props.passToken)
.then((response) => {
console.log(response);
setSpecies(response.data.species);
})
.catch((error) => {
console.log(error);
})
};

// const addSpecies = (species) => {
// console.log(species);
// Axios.post("species/add", species, props.passToken)
// .then((response) => { 
// console.log("Species Added Successfully!");
// console.log(response);
// loadSpeciesList();
// })
// .catch((error) => {
// console.error("Error Adding Specie: " + error);
// })
// }

const [newRecord , setnewRecord] = useState({});

const[newLat, setNewLat] = useState("");
const[newLong, setNewLong] = useState("");

const handleChange = (event) => { 
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const record = {...newRecord};
    record[attributeToChange] = newValue;
    console.log(record);
    setnewRecord(record);
} 

const [selectSpecies , setSelectSpecies] = useState("");
const [selectedSpeciesInfo , setSelectedSpeciesInfo] = useState();

const handleSpeciesChange = (event) => { 
    const attributeToChange = event.target.name;
    const newSpecies = event.target.value;

    console.log(newSpecies);

    setSelectSpecies(newSpecies);

    const record = {...newRecord};
    record[attributeToChange] = newSpecies;
    console.log(record);
    setnewRecord(record);
    speciesView(newSpecies);
} 

const handleSubmit = (event)=>{
    event.preventDefault();
    props.addRecord(newRecord)
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

// Wael upload image cahnges 
const [formData, setFormData] = useState({
    image: null
})

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}

const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({...prevData, image: file,}));

    if (file && file.name) {
        EXIF.getData(file, function() {
          var exifData = EXIF.pretty(this);
          if (exifData) {
            //console.log(exifData);

            let lat = EXIF.getTag(this, "GPSLatitude");
            let long = EXIF.getTag(this, "GPSLongitude");
            // console.log("Latitude:" + EXIF.getTag(this, "GPSLatitude"));
            // console.log("Longitude:" + EXIF.getTag(this, "GPSLongitude"));

            //console.log("\nConverting ...\n");

            if(lat){
            console.log("Latitude:" + parseFloat( ConvertDMSToDD(EXIF.getTag(this, "GPSLatitude")[0],EXIF.getTag(this, "GPSLatitude")[1],EXIF.getTag(this, "GPSLatitude")[2]),"N").toFixed(6) );
            let parsedlat = parseFloat( ConvertDMSToDD(EXIF.getTag(this, "GPSLatitude")[0],EXIF.getTag(this, "GPSLatitude")[1],EXIF.getTag(this, "GPSLatitude")[2]),"N").toFixed(6);
            setNewLat(parsedlat);
            }
            if(long){
            console.log("Longitude:" + parseFloat( ConvertDMSToDD(EXIF.getTag(this, "GPSLongitude")[0],EXIF.getTag(this, "GPSLongitude")[1],EXIF.getTag(this, "GPSLongitude")[2]),"E").toFixed(6) );
            let parsedlong = parseFloat( ConvertDMSToDD(EXIF.getTag(this, "GPSLongitude")[0],EXIF.getTag(this, "GPSLongitude")[1],EXIF.getTag(this, "GPSLongitude")[2]),"E").toFixed(6);
            setNewLong(parsedlong);
            }

          } else {
            console.log("No EXIF data found in image '" + file.name + "'.");
          }
        });
      }

      const attributeToChange = e.target.files[0];
      const newValue = e.target.value;
  
      const record = {...newRecord};
      record[attributeToChange] = newValue;
      console.log(record);
      setnewRecord(record);
      
  };

//function to extract data from image using exifjs
// function extractExif({
//     target: {
//       files: [file]
//     }
//   }) {
//     if (file && file.name) {
//       EXIF.getData(file, function() {
//         var exifData = EXIF.pretty(this);
//         if (exifData) {
//           console.log(exifData);
//           console.log(EXIF.getTag(this, "Orientation"));
//         } else {
//           console.log("No EXIF data found in image '" + file.name + "'.");
//         }
//       });
//     }
//   }  


  return (
    <div className="container py-1 mb-5">
        <h1>Record a Sighting </h1>
        <form onSubmit={handleSubmit} autoComplete="false">

        <div className="row g-5">

        <div className="col-md-6 col-lg-6">
            <div className="mb-3 pb-1">
                <label htmlFor="species" className="form-label">Species</label>
                
                <select id="species" name="species" className="form-select" onChange={handleSpeciesChange} required>
                <option value="" selected disabled>Select a monitored Species</option>
                {   
                    species.map( (specie, index) => (
                        <option key={index} value={specie._id}>{specie.name}</option>
                    )
                )}

                </select>
            </div>

            {/* <div className="mb-3 pb-1">
                <label htmlFor="date" className="form-label">Date</label>
                <input type="text" className='form-control' name="date" onChange={handleChange}></input>
            </div> */}

            <div className="mb-3 pb-1">
            <label htmlFor="date" className="form-label">Date / Time</label> 
            {/* <input type="time" className='form-control' name="time" onChange={handleChange}></input> */}
            <input type="datetime-local" className="form-control" id="date" name="date" onChange={handleChange} required/>


            </div>
            {/*             
            <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Time/Date:
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.dateTime}
                  onChange={handleChange}
                />
              </div> */}


            <div className="mb-3 pb-1">
                <label className="form-label">Location</label>
                <input type="text" className='form-control' name="location" onChange={handleChange} required/>
            </div>


            <div className="mb-3">
                <label htmlFor="notes" className="form-label"> Note:</label>
                <textarea className="form-control" id="notes" name="notes" value={formData.note} onChange={handleChange}></textarea>
            </div>

            <div className="mb-3 pb-1">
                <button onClick={ () => props.setIsCreateRecord(false) } className="btn btn-secondary me-2">Cancel</button>
                <input className='btn btn-primary' type="submit" value="Add Record" />
            </div>

        </div>

        <div className="col-md-6 col-lg-6">

        <div className='row g-3'>
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="locationLongitude" className="form-label">Longitude</label>
                    <input type="number" className='form-control' id="locationLongitude" name="locationLongitude" value={newLong} onChange={handleChange} required />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="locationLatitude" className="form-label">Latitude</label>
                    <input type="number" className='form-control' id="locationLatitude" name="locationLatitude" value={newLat} onChange={handleChange} required />
                </div>
            </div>
        </div>
            
            <div className="mb-3">
                <label htmlFor="image" className="form-label"> Upload Image:</label>
                <input type="file" name="image" id="image" className="form-control" accept="image/*" onChange={handleImageChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Preview Image:</label>
                <div className="imagesized" >
                {formData.image && (
                  <img src={URL.createObjectURL(formData.image)} alt="Preview" className="img-fluid" />
                )}
                </div>
              </div>

            <div>
                {selectSpecies}<br />
                { selectedSpeciesInfo ? JSON.stringify(selectedSpeciesInfo) : "" } 
            </div>
        </div>

        </div>
        </form>
    </div>
  )
}
