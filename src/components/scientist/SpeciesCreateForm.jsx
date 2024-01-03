import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SpeciesCreateForm(props) {

const [newSpecies , setnewSpecies] = useState({});

const [searchResults, setSearchResults] = useState([]);

const [searchAllResults, setSearchAllResults] = useState("");

const handleChangeSpecies = (event) => { 
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const specie = {...newSpecies};
    specie[attributeToChange] = newValue;
    console.log(specie);
    setnewSpecies(specie);
} 

const handleSubmitSpecies = (event) => {
    event.preventDefault();

    const specie = {...newSpecies};
    const UserAttrib = "user";
    specie[UserAttrib] = props.userID;

    setnewSpecies(specie);

    props.addSpecies(specie);
    event.target.reset(); //clear the form
}

const handleSearchSubmit = (event) => {
  event.preventDefault();

  setSearchAllResults("");

  console.log("searchValue",event.target.elements.searchValue.value)
  const searchValue = event.target.elements.searchValue.value;
  searchedFor(searchValue);
};

function searchedFor(searched) {
  let options = {
    method: 'GET',
    headers: { 'x-api-key': 'SaITidZ/aY3VXro/aa0biA==0e4EFYKwrghqStOC' },
  };

  let url = 'https://api.api-ninjas.com/v1/animals?name=' + searched;

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data); //data from API
      setSearchResults(data); // Update searchResults state
    })
    .catch((error) => {
      console.log(error);
    });
}

function populateFields(selectedButton){

}

const allSearchResults = searchResults.map((result, index) => (
  <><button className="btn btn-sm btn-primary" onClick={ () => populateFields(result) } key={index}>{result.name}</button><br /></>
))

return (
<>
<div className="container py-1 mb-5">

<h5><FontAwesomeIcon icon="pencil" /> Add New Species you want to Survey</h5>

<div className="row g-5">

<div className="col-md-6 col-lg-6">
<form onSubmit={handleSubmitSpecies} autoComplete="off">
  <div className="input-group input-group-sm mb-3">
    <span htmlFor="name" className="input-group-text bg-warning text-dark">Species Name</span>
    <input className="form-control" id="name" name="name" type="text" onChange={handleChangeSpecies} required />
  </div>

  <div className="input-group input-group-sm mb-3">
    <span htmlFor="common_name" className="input-group-text bg-warning text-dark">Common Name</span>
    <input className="form-control" id="common_name" name="common_name" type="text" onChange={handleChangeSpecies} required />
  </div>

<br />
<h5>Characteristics</h5>

<div className="input-group input-group-sm mb-3">
  <span htmlFor="speciestype" className="input-group-text bg-warning text-dark">Species Type</span>
    <input className="form-control" id="speciestype" name="speciestype" type="text" onChange={handleChangeSpecies} required />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="color" className="input-group-text bg-success">Color(s)</span>
    <input className="form-control" id="color" name="color" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="weight" className="input-group-text bg-success">Known Weight(s)</span>
    <input className="form-control" id="weight" name="weight" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="length" className="input-group-text bg-success">Known Length(s)</span>
    <input className="form-control" id="length" name="length" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="location" className="input-group-text bg-warning text-dark">Known Location(s)</span>
    <input className="form-control" id="location" name="location" type="text" onChange={handleChangeSpecies} required />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="distinctive_feature" className="input-group-text bg-success">Distinctive Feature(s)</span>
    <input className="form-control" id="distinctive_feature" name="distinctive_feature" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="distinctive_feature" className="input-group-text bg-success">Habitat</span>
    <input className="form-control" id="habitat" name="habitat" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="predators" className="input-group-text bg-success">Predators</span>
    <input className="form-control" id="predators" name="predators" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="favorite_food" className="input-group-text bg-success">Favorite Food</span>
    <input className="form-control" id="favorite_food" name="favorite_food" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="main_prey" className="input-group-text bg-success">Main Pray</span>
    <input className="form-control" id="main_prey" name="main_prey" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="main_prsloganey" className="input-group-text bg-success">Slogan</span>
    <input className="form-control" id="slogan" name="slogan" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="lifestyle" className="input-group-text bg-success">Life Style</span>
    <input className="form-control" id="lifestyle" name="lifestyle" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="skin_type" className="input-group-text bg-success">Skin Type</span>
    <input className="form-control" id="skin_type" name="skin_type" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="top_speed" className="input-group-text bg-success">Top Speed</span>
    <input className="form-control" id="top_speed" name="top_speed" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="lifespan" className="input-group-text bg-success">Life Span</span>
    <input className="form-control" id="lifespan" name="lifespan" type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
    <span htmlFor="notes" className="input-group-text bg-warning text-dark"> Notes</span>
      <input className ="form-control" id="notes" name="notes" onChange={handleChangeSpecies} required />
  </div>

  <br />
  <div className="d-flex w-100">
  <button onClick={ () => props.setIsCreateSpecies(false) } className="btn btn-secondary me-2 w-50">Cancel</button> <button className="btn btn-success w-50" type="submit">Submit</button>
  </div>
  </form>
</div>

<div className="col-md-6 col-lg-6">

<div>
    <form className="d-flex mb-3" role="search" onSubmit={handleSearchSubmit}>
        <input className="form-control me-2" type="search" id="searchValue" name="searchValue" placeholder="Search for a Species" aria-label="Search" />
        <button  className="btn btn-outline-success" type="submit">Search</button>
    </form>
    <div>
    <ul>
      {searchAllResults != null ? searchAllResults : "No data" }
    </ul>

    </div>
</div>

<p>Enhance your Species Surveys by specifying detailed creature characteristics!</p>
<p>Here's how it works:</p>

<strong>Add visual cues: Beyond basic species names, provide details like:</strong><br />

<ul>
<li>Size and shape: Are they small and slender like weasels, or large and bulky like bears?</li>
<li>Distinguishing features: Unique markings, fur patterns, horn shapes, or prominent features like long tails or beaks.</li>
<li>Coloration: Describe primary and secondary colors, patterns, or changes depending on age or gender.</li>
<li>Behavior: Mention if they're solitary or pack animals, vocalizations, or specific movements.</li>
<li>Habitat: Specify preferred environments and potential locations for sightings.</li>
<li>Empower contributors: With richer descriptions, contributors can accurately identify species, leading to higher quality data for your research.</li>
</ul>

<p>Simplify and streamline: Easy-to-understand characteristics allow for faster and more accurate survey completion, saving you valuable time and resources.</p>

<p>Start enriching your surveys today! Let's bridge the gap between scientific precision and public understanding for more effective wildlife conservation.</p>
</div>

</div>

</div>

</>
)
}
