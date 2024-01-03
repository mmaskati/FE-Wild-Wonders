import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { Link } from "react-router-dom";

export default function SpecieEditForm(props) {

const [specie, setEditSpecie] = useState(props.specie);

const handleChange = (event) => {
  //define the attributes from the form you need
  const attributeToChange = event.target.name;
  //define the values for those attributes
  const editValue = event.target.value;

  const updatedSpecie = {...specie};
  updatedSpecie[attributeToChange] = editValue;
  // console.log(updatedSpecie);
  setEditSpecie(updatedSpecie);
}

const handleSubmit = (event) => {
    event.preventDefault();
    props.updateSpecies(specie);
    event.target.reset(); //clear the form
}

return (
<>
<h5><FontAwesomeIcon icon="pencil" /> Edit Specie</h5>

<div className="table center">

<form onSubmit={handleSubmit} autoComplete="off">
<div className="input-group input-group-sm mb-3">
    <span htmlFor="name" className="form-label-sm">Species Name</span>
    <input className="form-control" id="name" name="name" type="text" onChange={handleChange} value={specie.name} required />
  </div>

  <div className="input-group input-group-sm mb-3">
    <span htmlFor="common_name" className="form-label">Common Name</span>
    <input className="form-control" id="common_name" name="common_name" type="text" onChange={handleChange} value={specie.characteristics.common_name}  />
  </div>
<br />
<h5>Characteristics</h5>

<div className="input-group input-group-sm mb-3">
  <span htmlFor="speciestype" className="form-label">Species Type</span>
    <input className="form-control" id="speciestype" name="speciestype" type="text"  value={specie.characteristics.speciestype} onChange={handleChange}  />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="color" className="form-label">Color(s)</span>
    <input className="form-control" id="color" name="color" type="text"  value={specie.characteristics.color} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="weight" className="form-label">Known Weight(s)</span>
    <input className="form-control" id="weight" name="weight" type="text"  value={specie.characteristics.weight} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="length" className="form-label">Known Length(s)</span>
    <input className="form-control" id="length" name="length" type="text"  value={specie.characteristics.length} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="location" className="form-label">Known Location(s)</span>
    <input className="form-control" id="location" name="location" type="text"  value={specie.characteristics.location} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="distinctive_feature" className="form-label">Distinctive Feature(s)</span>
    <input className="form-control" id="distinctive_feature" name="distinctive_feature" type="text"  value={specie.characteristics.distinctive_feature} onChange={handleChange} />
  </div>
  
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="distinctive_feature" className="form-label">Habitat</span>
    <input className="form-control" id="habitat" name="habitat" type="text"  value={specie.characteristics.habitat} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="predators" className="form-label">Predators</span>
    <input className="form-control" id="predators" name="predators" type="text"  value={specie.characteristics.predators} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="favorite_food" className="form-label">Favorite Food</span>
    <input className="form-control" id="favorite_food" name="favorite_food" type="text"  value={specie.characteristics.favorite_food} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="main_prey" className="form-label">Main Pray</span>
    <input className="form-control" id="main_prey" name="main_prey" type="text"  value={specie.characteristics.main_prey} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="main_prsloganey" className="form-label">Slogan</span>
    <input className="form-control" id="slogan" name="main_sloganprey" type="text"  value={specie.characteristics.slogan} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="lifestyle" className="form-label">Life Style</span>
    <input className="form-control" id="lifestyle" name="lifestyle" type="text"  value={specie.characteristics.lifestyle} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="skin_type" className="form-label">Skin Type</span>
    <input className="form-control" id="skin_type" name="skin_type" type="text"  value={specie.characteristics.skin_type} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="top_speed" className="form-label">Top Speed</span>
    <input className="form-control" id="top_speed" name="top_speed" type="text"  value={specie.characteristics.top_speed} onChange={handleChange} />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span htmlFor="lifespan" className="form-label">Life Span</span>
    <input className="form-control" id="lifespan" name="lifespan" type="text"  value={specie.characteristics.lifespan} onChange={handleChange} />
  </div>

  <div className="input-group mb-3">
    <span htmlFor="note" className="form-label"> Note: </span>
      <textarea className ="form-control" id="note" name="note" value={specie.characteristics.lifespan} onChange={handleChange} >
      </textarea>
  </div>



{/*  ,
  show: { type: Boolean, default: true },
  photo: String, */}

  <br />
  {/* <div className="w-100"> */}
  <button onClick={ () => props.isEdit(false) } className="btn btn-secondary me-2">Cancel</button> <button className="btn btn-warning" type="submit">Update</button>
  {/* </div> */}
</form>

</div>
</>
)
}
