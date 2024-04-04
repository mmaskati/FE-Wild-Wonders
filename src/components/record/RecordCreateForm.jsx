import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import EXIF from 'exif-js';

import ImageUpload from '../../components/page/ImageUpload';

export default function RecordCreateForm(props) {

// const RecordForm = () => {
//     const [formData, setFormData] = useState({
//         user: props.userID,
//         species: null,
//         date: '',
//         time: '',
//         location: '',
//         locationLongitude: '',
//         locationLatitude: '',
//         image: null,
//         notes: '',
//         quantity: '',
//     });
// }

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

const [newRecord , setnewRecord] = useState({});
const [newValues , setNewValues] = useState({});

const[newLat, setNewLat] = useState("");
const[newLong, setNewLong] = useState("");

const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);
const [loading, setLoading] = useState("");
const [url, setUrl] = useState("");

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

    //console.log(newSpecies);

    setSelectSpecies(newSpecies);

    const record = {...newRecord};
    record[attributeToChange] = newSpecies;
    console.log(record);
    setnewRecord(record);
    speciesView(newSpecies);
} 

const handleSubmit = (event)=>{
    event.preventDefault();

    const record = {...newRecord};
    const ImageLink = "image";
    record[ImageLink] = url;
    setnewRecord(record);
    console.log(record);

    props.addRecord(record)
}

const speciesView = (id) => {
Axios.get(`species/detail?id=${id}`, props.passToken)
.then( ( res ) => {
    //console.log("Loaded Species Info");
    //console.log(res.data.species);
    //let specie = res.data.species;

    setSelectedSpeciesInfo(res.data.species);

})
.catch((error) => {
    console.log("Error loading Species Information: ");
    console.log(error);
})
}

// Wael upload image cahnges 
const [formData, setFormData] = useState({image: null});

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);

  console.log(typeof direction);

    if (direction === "S" || direction === "W") {
        dd = dd * -1;
        console.log("Converted >>>>>>> " + dd);
    } // Don't do anything for N or E
    
    return dd;
}

const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({...prevData, image: file,}));

    const attributeToChange = e.target.name;
    const newValue = e.target.value;

    const LatAttrib = "locationLatitude";
    const LongAttrib = "locationLongitude";

    const coordinates = {...newValues}

    const record = {...newRecord};
    record[attributeToChange] = newValue;
  
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  
    if (file && file.name) {
        EXIF.getData(file, function() {
          var exifData = EXIF.pretty(this);
          if (exifData) {
            //console.log(exifData);

            let lat = EXIF.getTag(this, "GPSLatitude");
            let long = EXIF.getTag(this, "GPSLongitude");
            // console.log("Latitude:" + EXIF.getTag(this, "GPSLatitude"));
            // console.log("Longitude:" + EXIF.getTag(this, "GPSLongitude"));
            let direction = EXIF.getTag(this, "GPSLongitudeRef");
            console.log("\nDirection ..." + direction);

            if(lat){
            //console.log("Latitude:" + parseFloat( ConvertDMSToDD(EXIF.getTag(this, "GPSLatitude")[0],EXIF.getTag(this, "GPSLatitude")[1],EXIF.getTag(this, "GPSLatitude")[2]),"N").toFixed(6) );
            let parsedlat = parseFloat( ConvertDMSToDD(EXIF.getTag(this, "GPSLatitude")[0],EXIF.getTag(this, "GPSLatitude")[1],EXIF.getTag(this, "GPSLatitude")[2],EXIF.getTag(this, "GPSLatitudeRef")).toFixed(6));
            console.log("Lat: " + parsedlat);
            //setNewLat(parsedlat);
            //let attributeToChange = {"locationLatitude"};
            record[LatAttrib] = parsedlat;
            coordinates[LatAttrib] = parsedlat;
            setnewRecord(record);
            setNewValues(coordinates);
            }
            if(long){
            //console.log("Longitude:" + parseFloat( ConvertDMSToDD(EXIF.getTag(this, "GPSLongitude")[0],EXIF.getTag(this, "GPSLongitude")[1],EXIF.getTag(this, "GPSLongitude")[2]),"E").toFixed(6) );
            let parsedlong = parseFloat( ConvertDMSToDD(EXIF.getTag(this, "GPSLongitude")[0],EXIF.getTag(this, "GPSLongitude")[1],EXIF.getTag(this, "GPSLongitude")[2],EXIF.getTag(this, "GPSLongitudeRef")).toFixed(6));
            console.log("Lng: " + parsedlong);
            //setNewLong(parsedlong);
            record[LongAttrib] = parsedlong;
            coordinates[LongAttrib] = parsedlong;
            setnewRecord(record);
            setNewValues(coordinates);
            }
            //setNewValue(record);

            console.log(record);
            setLoading("");

          } else {
            setNewValues("");
            console.log("No EXIF data found in image '" + file.name + "'.");
            setLoading("No EXIF data found in image '" + file.name + "'.")
          }
        });
      }

      const UserAttrib = "user";
      record[UserAttrib] = props.userID;
      
      setnewRecord(record);
      console.log(record);      
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
        

        <div className="row g-5">

        <div className="col-md-6 col-lg-6">
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-3 pb-1">
                <label htmlFor="species" className="form-label">Species</label>
                
                <select id="species" name="species" className="form-select" onChange={handleSpeciesChange} required>
                <option value="non" disabled>Select a monitored Species</option>
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

            <div className='row g-3'>
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="locationLongitude" className="form-label">Longitude</label>
                    <input type="tel" className='form-control' id="locationLongitude" name="locationLongitude" value={newRecord.locationLongitude} onChange={handleChange} required />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="locationLatitude" className="form-label">Latitude</label>
                    <input type="tel" className='form-control' id="locationLatitude" name="locationLatitude" value={newRecord.locationLatitude} onChange={handleChange} required />
                </div>
            </div>
            </div>

            <div className="mb-3 pb-1">
                <button onClick={ () => props.setIsCreateRecord(false) } className="btn btn-secondary me-2">Cancel</button>
                <button className='btn btn-primary' type="submit" disabled={!newValues}>Add Record</button>
            </div>
        </form>
        </div>

        <div className="col-md-6 col-lg-6">
              
              <ImageUpload handleImageChange={handleImageChange} image={image} setImage={setImage} url={url} setUrl={setUrl} loading={loading} setLoading={setLoading} />
            <div className="mb-3">
                {/* <label htmlFor="image" className="form-label"> Upload Image:</label>
                <input type="file" name="image" id="image" className="form-control" accept="image/*" onChange={handleImageChange} required /> */}
                <input type="hidden" name="image" id="image" className="form-control" onChange={handleImageChange} value={url} required />
                
              </div>

              <div className="mb-3">
                {loading}
                {/* <label className="form-label">Preview Image:</label> */}
                <div >
                {/* {formData.image && (
                  <img src={URL.createObjectURL(formData.image)} alt="Preview" className="img-fluid" />
                )} */}
                {preview && <img src={preview} alt="Preview" className="img-fluid"/>}
                </div>
              </div>

            <div>
                {selectSpecies}<br />
                { selectedSpeciesInfo ? JSON.stringify(selectedSpeciesInfo) : "" } 
            </div>
        </div>

        </div>
        
    </div>
  )
}
