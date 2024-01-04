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

  // console.log("searchValue",event.target.elements.searchValue.value)
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
      //console.log(data); //data from API
      setSearchResults(data); // Update searchResults state
    })
    .catch((error) => {
      console.log(error);
    });
}

const [newValue , setNewValue] = useState({});

const handleChangeFields = (fieldName, fieldValue) => { 
  const inputMapping = {
    attribute1: 'name',
    attribute2: 'common_name',
    attribute3: 'speciestype',
    attribute4: 'color',
    attribute5: 'weight',
    attribute6: 'length',
    attribute7: 'location',
    attribute8: 'distinctive_feature',
    attribute9: 'habitat',
    attribute10: 'predators',
    attribute11: 'favorite_food',
    attribute12: 'main_prey',
    attribute13: 'slogan',
    attribute14: 'lifestyle',
    attribute15: 'skin_type',
    attribute16: 'top_speed',
    attribute17: 'lifespan'
  };
  
  const updatedValue = inputMapping[fieldName] || fieldValue;

  const value = { ...newValue };
  value[fieldName] = updatedValue;
  //console.log(inputMapping[fieldName] + " : " + fieldValue);

  setNewValue(value);
}

//this function will allow to populate the API fields to the input field sin the form
function populateFields(selectedButton){
//console.log(selectedButton);

// handleChangeFields('attribute1', selectedButton.name);
// handleChangeFields('attribute2', selectedButton.characteristics.common_name);
// handleChangeFields('attribute3', selectedButton.characteristics.diet); //type
// handleChangeFields('attribute4', selectedButton.characteristics.color);
// handleChangeFields('attribute5', selectedButton.characteristics.weight);
// handleChangeFields('attribute6', selectedButton.characteristics.length);
// handleChangeFields('attribute7', selectedButton.characteristics.locations);
// handleChangeFields('attribute8', selectedButton.characteristics.distinctive_feature);
// handleChangeFields('attribute9', selectedButton.characteristics.habitat);
// handleChangeFields('attribute10', selectedButton.characteristics.predators);
// handleChangeFields('attribute11', selectedButton.characteristics.favorite_food);
// handleChangeFields('attribute12', selectedButton.characteristics.main_prey);
// handleChangeFields('attribute13', selectedButton.characteristics.slogan);
// handleChangeFields('attribute14', selectedButton.characteristics.lifestyle);
// handleChangeFields('attribute15', selectedButton.characteristics.skin_type);
// handleChangeFields('attribute16', selectedButton.characteristics.top_speed);
// handleChangeFields('attribute17', selectedButton.characteristics.lifespan);

const specie = {...newSpecies};

specie['name'] = selectedButton.name;
specie['common_name'] = selectedButton.characteristics.common_name;
specie['diet'] = selectedButton.characteristics.diet; 
specie['color'] = selectedButton.characteristics.color;
specie['weight'] = selectedButton.characteristics.weight;
specie['length'] = selectedButton.characteristics.length;
specie['locations'] = selectedButton.characteristics.locations;
specie['distinctive_feature'] = selectedButton.characteristics.distinctive_feature;
specie['habitat'] = selectedButton.characteristics.habitat;
specie['predators'] = selectedButton.characteristics.predators;
specie['favorite_food'] = selectedButton.characteristics.favorite_food;
specie['main_prey'] = selectedButton.characteristics.main_prey;
specie['slogan'] = selectedButton.characteristics.slogan;
specie['lifestyle'] = selectedButton.characteristics.lifestyle;
specie['skin_type'] = selectedButton.characteristics.skin_type;
specie['top_speed'] = selectedButton.characteristics.top_speed;
specie['lifespan'] = selectedButton.characteristics.lifespan;

console.log(specie);
setnewSpecies(specie);



}



//onClick={ () => populateFields(result) }
const allSearchResults = searchResults.map((result, index) => (
  <><button className="btn btn-sm btn-primary mb-1" onClick={ () => populateFields(result) } key={index}>{result.name}</button><br /></>
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
    <input className="form-control" id="name" name="name" value={newSpecies.name} type="text" onChange={handleChangeSpecies} required />
  </div>

  <div className="input-group input-group-sm mb-3">
    <span htmlFor="common_name" className="input-group-text bg-warning text-dark">Common Name</span>
    <input className="form-control" id="common_name" name="common_name" value={newSpecies.common_name} type="text" onChange={handleChangeSpecies} required />
  </div>

<br />
<h5>Characteristics</h5>

<div className="input-group input-group-sm mb-3">
  <span htmlFor="speciestype" className="input-group-text bg-warning text-dark">Species Type</span>
    <input className="form-control" id="speciestype" name="speciestype" value={newSpecies.speciestype} type="text" onChange={handleChangeSpecies} required />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="color" className="input-group-text bg-success">Color(s)</span>
    <input className="form-control" id="color" name="color" type="text" value={newSpecies.color} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="weight" className="input-group-text bg-success">Known Weight(s)</span>
    <input className="form-control" id="weight" name="weight" type="text" value={newSpecies.weight} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="length" className="input-group-text bg-success">Known Length(s)</span>
    <input className="form-control" id="length" name="length" value={newSpecies.length} type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="location" className="input-group-text bg-warning text-dark">Known Location(s)</span>
    <input className="form-control" id="location" name="location" value={newSpecies.locations} type="text" onChange={handleChangeSpecies} required />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="distinctive_feature" className="input-group-text bg-success">Distinctive Feature(s)</span>
    <input className="form-control" id="distinctive_feature" name="distinctive_feature" value={newSpecies.distinctive_feature} type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="distinctive_feature" className="input-group-text bg-success">Habitat</span>
    <input className="form-control" id="habitat" name="habitat" type="text" value={newSpecies.habitat} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="predators" className="input-group-text bg-success">Predators</span>
    <input className="form-control" id="predators" name="predators" type="text" value={newSpecies.predators} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="favorite_food" className="input-group-text bg-success">Favorite Food</span>
    <input className="form-control" id="favorite_food" name="favorite_food" type="text" value={newSpecies.favorite_food} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="main_prey" className="input-group-text bg-success">Main Pray</span>
    <input className="form-control" id="main_prey" name="main_prey" value={newSpecies.main_prey} type="text" onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="main_prsloganey" className="input-group-text bg-success">Slogan</span>
    <input className="form-control" id="slogan" name="slogan" type="text" value={newSpecies.slogan} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="lifestyle" className="input-group-text bg-success">Life Style</span>
    <input className="form-control" id="lifestyle" name="lifestyle" type="text" value={newSpecies.lifestyle} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="skin_type" className="input-group-text bg-success">Skin Type</span>
    <input className="form-control" id="skin_type" name="skin_type" type="text" value={newSpecies.skin_type} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="top_speed" className="input-group-text bg-success">Top Speed</span>
    <input className="form-control" id="top_speed" name="top_speed" type="text" value={newSpecies.top_speed} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="lifespan" className="input-group-text bg-success">Life Span</span>
    <input className="form-control" id="lifespan" name="lifespan" type="text" value={newSpecies.lifespan} onChange={handleChangeSpecies} />
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
  <code>Search Animal API for options</code>
    <form className="d-flex mb-3" role="search" onSubmit={handleSearchSubmit}>
        <input className="form-control me-2" type="search" id="searchValue" name="searchValue" placeholder="Search for a Species" aria-label="Search" />
        <button  className="btn btn-outline-success" type="submit">Search</button>
    </form>
    <div>

      {allSearchResults != null ? allSearchResults : "No data" }


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
