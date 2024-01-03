import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import EXIF from 'exif-js';
export default function RecordEditForm(props) {
    const [species, setSpecies] = useState([]);
    const [newUpd, setNewUpd] = useState({});
    const [newLat, setNewLat] = useState('');
    const [newLong, setNewLong] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [url, setUrl] = useState('');
    const [selectSpecies, setSelectSpecies] = useState('');
    const [selectedSpeciesInfo, setSelectedSpeciesInfo] = useState({});
    const [formData, setFormData] = useState({ image: null });
  
    useEffect(() => {
      loadSpeciesList();
    }, []);
  
    const loadSpeciesList = () => {
      Axios.get('species/index', props.passToken)
        .then((response) => {
          console.log(response);
          setSpecies(response.data.species);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const handleChange = (event) => {
      const attributeToChange = event.target.name;
      const newValue = event.target.value;
  
      const record = { ...newUpd };
      record[attributeToChange] = newValue;
      console.log(record);
      setNewUpd(record);
    };
  
    const handleSpeciesChange = (event) => {
      const attributeToChange = event.target.name;
      const newSpecies = event.target.value;
  
      setSelectSpecies(newSpecies);
  
      const record = { ...newUpd };
      record[attributeToChange] = newSpecies;
      console.log(record);
      setNewUpd(record);
      speciesView(newSpecies);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const record = { ...newUpd };
      const ImageLink = 'image';
      record[ImageLink] = url;
      setNewUpd(record);
      console.log(record);
  
      props.addRecord(record);
    };
  
    const speciesView = (id) => {
      Axios.get(`species/detail?id=${id}`, props.passToken)
        .then((res) => {
          console.log('Loaded Species Info');
          console.log(res.data.species);
          setSelectedSpeciesInfo(res.data.species);
        })
        .catch((error) => {
          console.log('Error loading Species Information: ');
          console.log(error);
        });
    };
  
    const ConvertDMSToDD = (degrees, minutes, seconds, direction) => {
      var dd = degrees + minutes / 60 + seconds / (60 * 60);
  
      if (direction === 'S' || direction === 'W') {
        dd = dd * -1;
      } // Don't do anything for N or E
      return dd;
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setFormData((prevData) => ({ ...prevData, image: file }));
  
      const attributeToChange = e.target.name;
      const newValue = e.target.value;
  
      const LatAttrib = 'locationLatitude';
      const LongAttrib = 'locationLongitude';
  
      const record = { ...newUpd };
      record[attributeToChange] = newValue;
  
      setImage(file);
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        setPreview(reader.result);
      };
  
      if (file && file.name) {
        EXIF.getData(file, function () {
          var exifData = EXIF.pretty(this);
          if (exifData) {
            let lat = EXIF.getTag(this, 'GPSLatitude');
            let long = EXIF.getTag(this, 'GPSLongitude');
  
            if (lat) {
              let parsedlat = parseFloat(
                ConvertDMSToDD(
                  EXIF.getTag(this, 'GPSLatitude')[0],
                  EXIF.getTag(this, 'GPSLatitude')[1],
                  EXIF.getTag(this, 'GPSLatitude')[2]
                ),
                'N'
              ).toFixed(6);
              setNewLat(parsedlat);
              record[LatAttrib] = parsedlat;
            }
            if (long) {
              let parsedlong = parseFloat(
                ConvertDMSToDD(
                  EXIF.getTag(this, 'GPSLongitude')[0],
                  EXIF.getTag(this, 'GPSLongitude')[1],
                  EXIF.getTag(this, 'GPSLongitude')[2]
                ),
                'E'
              ).toFixed(6);
              setNewLong(parsedlong);
              record[LongAttrib] = parsedlong;
            }
          } else {
            console.log("No EXIF data found in image '" + file.name + "'.");
          }
        });
      }
  
      const UserAttrib = 'user';
      record[UserAttrib] = props.userID;
  
      setNewUpd(record);
      console.log(record);
    };
  
    return (
        
        <div className="col-md-6 col-lg-6">
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-3 pb-1">
                <label htmlFor="species" className="form-label">Record</label>
                
                <select id="species" name="species" className="form-select" onChange={handleSpeciesChange} required>
                <option value="" selected disabled> Record</option>
                {   
                    species.map( (specie, index) => (
                        <option key={index} value={specie._id}>{specie.name}</option>
                    )
                )}

                </select>
            </div>

            
        <div className="mb-3 pb-1">
            <label htmlFor="date" className="form-label">Date / Time</label> 
            {/* <input type="time" className='form-control' name="time" onChange={handleChange}></input> */}
            <input type="datetime-local" className="form-control" id="date" name="date" onChange={handleChange} required/>
        </div>

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
                    <input type="number" className='form-control' id="locationLongitude" name="locationLongitude" value={newLong} onChange={handleChange} required readonly/>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="locationLatitude" className="form-label">Latitude</label>
                    <input type="number" className='form-control' id="locationLatitude" name="locationLatitude" value={newLat} onChange={handleChange} required readonly/>
                </div>
            </div>
            </div>

            <div className="mb-3 pb-1">
                <button onClick={ () => props.setIsCreateRecord(false) } className="btn btn-secondary me-2">Cancel</button>
                <input className='btn btn-primary' type="submit" value="Add Record" />
            </div>
        </form>
        <div className="col-md-6 col-lg-6">
            <div className="mb-3">
                <input type="hidden" name="image" id="image" className="form-control" onChange={handleImageChange} value={url} required />
              </div>

              <div className="mb-3">
                {preview && <img src={preview} alt="Preview" className="img-fluid"/>}
                </div>
              </div>

        </div>

    );
  };
  
