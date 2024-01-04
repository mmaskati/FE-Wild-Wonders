import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { Link } from "react-router-dom";

export default function SpecieEditForm(props) {

const [specie, setEditSpecie] = useState(props.specie);

const handleChangeSpecies = (event) => {
  //define the attributes from the form you need
  const attributeToChange = event.target.name;
  //define the values for those attributes
  const editValue = event.target.value;

  const updatedSpecie = {...specie};
  updatedSpecie[attributeToChange] = editValue;
  //console.log(updatedSpecie);
  setEditSpecie(updatedSpecie);
}

const handleSubmitSpecies = (event) => {
    event.preventDefault();
    props.updateSpecies(specie);
    event.target.reset(); //clear the form
}

return (
<>
<h5><FontAwesomeIcon icon="pencil" /> Edit Species</h5>

<div className="table center">

<form onSubmit={handleSubmitSpecies} autoComplete="off">
  <div className="input-group input-group-sm mb-3">
    <span htmlFor="name" className="input-group-text bg-success">Species Name</span>
    <input className="form-control" id="name" name="name" type="text" onChange={handleChangeSpecies} value={specie.name} required />
  </div>

  <div className="input-group input-group-sm mb-3">
    <span htmlFor="common_name" className="input-group-text bg-success">Common Name</span>
    <input className="form-control" id="common_name" name="common_name" type="text" onChange={handleChangeSpecies} value={specie.common_name}  />
  </div>

<br />
<h5>Characteristics</h5>

{/* Added by Wael */}

<div className="input-group input-group-sm mb-3">
  <span htmlFor="speciestype" className="input-group-text bg-success">Species Type</span>
    <input className="form-control" id="speciestype" name="speciestype" type="text"  value={specie.speciestype} onChange={handleChangeSpecies}  />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="color" className="input-group-text bg-success">Color(s)</span>
    <input className="form-control" id="color" name="color" type="text"  value={specie.color} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="weight" className="input-group-text bg-success">Known Weight(s)</span>
    <input className="form-control" id="weight" name="weight" type="text"  value={specie.weight} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="length" className="input-group-text bg-success">Known Length(s)</span>
    <input className="form-control" id="length" name="length" type="text"  value={specie.length} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="location" className="input-group-text bg-success">Known Location(s)</span>
    <input className="form-control" id="location" name="location" type="text"  value={specie.location} onChange={handleChangeSpecies} />
  </div>


<div className="input-group input-group-sm mb-3">
  <span htmlFor="distinctive_feature" className="input-group-text bg-success">Distinctive Feature(s)</span>
    <input className="form-control" id="distinctive_feature" name="distinctive_feature" type="text"  value={specie.distinctive_feature} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="distinctive_feature" className="input-group-text bg-success">Habitat</span>
    <input className="form-control" id="habitat" name="habitat" type="text"  value={specie.habitat} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="predators" className="input-group-text bg-success">Predators</span>
    <input className="form-control" id="predators" name="predators" type="text"  value={specie.predators} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="favorite_food" className="input-group-text bg-success">Favorite Food</span>
    <input className="form-control" id="favorite_food" name="favorite_food" type="text"  value={specie.favorite_food} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="main_prey" className="input-group-text bg-success">Main Pray</span>
    <input className="form-control" id="main_prey" name="main_prey" type="text"  value={specie.main_prey} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="main_prsloganey" className="input-group-text bg-success">Slogan</span>
    <input className="form-control" id="slogan" name="slogan" type="text"  value={specie.slogan} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="lifestyle" className="input-group-text bg-success">Life Style</span>
    <input className="form-control" id="lifestyle" name="lifestyle" type="text"  value={specie.lifestyle} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="skin_type" className="input-group-text bg-success">Skin Type</span>
    <input className="form-control" id="skin_type" name="skin_type" type="text"  value={specie.skin_type} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="top_speed" className="input-group-text bg-success">Top Speed</span>
    <input className="form-control" id="top_speed" name="top_speed" type="text"  value={specie.top_speed} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="lifespan" className="input-group-text bg-success">Life Span</span>
    <input className="form-control" id="lifespan" name="lifespan" type="text"  value={specie.lifespan} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
    <span htmlFor="notes" className="input-group-text bg-success"> Notes</span>
      <input className ="form-control" id="notes" name="notes" value={specie.notes} onChange={handleChangeSpecies} />
  </div>

  <br />
  {/* <div className="w-100"> */}
  <button onClick={ () => props.setIsEditSpecies(false) } className="btn btn-secondary me-2">Cancel</button> <button className="btn btn-warning" type="submit">Update</button>
  {/* </div> */}
</form>

</div>
</>
)
}
