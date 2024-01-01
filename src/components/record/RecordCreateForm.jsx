import React, { useState, useEffect } from 'react';
import Axios from 'axios';



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

  return (
    <div className="container py-1 mb-5">
        <h1>Record a Sighting</h1>
        <form onSubmit={handleSubmit} autoComplete="false">

        <div className="row g-5">

        <div className="col-md-7 col-lg-8">
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

            <div className="mb-3 pb-1">
                <label className="form-label">Date</label>
                <input type="text" className='form-control' name="date" onChange={handleChange}></input>
            </div>

            <div className="mb-3 pb-1">
                <label className="form-label">Location</label>
                <input type="text" className='form-control' name="location" onChange={handleChange}></input>
            </div>
        </div>
        <div className="col-md-5 col-lg-4">
            <div className="mb-3 pb-1">
                <label className="form-label">Location Longatittude</label>
                <input type="text" className='form-control' name="locationLongitude" onChange={handleChange}></input>
            </div>

            <div className="mb-3 pb-1">
                <label className="form-label">Location Latittude</label>
                <input type="text" className='form-control' name="locationLatitude" onChange={handleChange}></input>
            </div>

            <div className="mb-3 pb-1">
                <button onClick={ () => props.setIsCreate(false) } className="btn btn-secondary me-2">Cancel</button>
                <input className='btn btn-primary' type="submit" value="Add Record" />
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
