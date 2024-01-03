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
  console.log(updatedSpecie);
  setEditSpecie(updatedSpecie);
}

const handleSubmitSpecies = (event) => {
    event.preventDefault();
    props.updateSpecies(specie);
    event.target.reset(); //clear the form
}

return (
<>
<h5><FontAwesomeIcon icon="pencil" /> Edit Specie</h5>

<div className="table center">

<form onSubmit={handleSubmitSpecies} autoComplete="off">
<div className="mb-3 pb-1">
    <label htmlFor="name" className="form-label">Species Name</label>
    <input className="form-control" id="name" name="name" type="text" onChange={handleChangeSpecies} value={specie.name} required />
  </div>

  <div className="mb-3 pb-1">
    <label htmlFor="common_name" className="form-label">Common Name</label>
    <input className="form-control" id="common_name" name="common_name" type="text" onChange={handleChangeSpecies} value={specie.common_name}  />
  </div>
<br />
<h5>Characteristics</h5>

{/* Added by Wael */}

<div className="input-group input-group-sm mb-3">
  <span htmlFor="speciestype" className="form-label">Species Type</span>
    <input className="form-control" id="speciestype" name="speciestype" type="text"  value={specie.speciestype} onChange={handleChangeSpecies}  />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="color" className="form-label">Color(s)</span>
    <input className="form-control" id="color" name="color" type="text"  value={specie.color} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="weight" className="form-label">Known Weight(s)</span>
    <input className="form-control" id="weight" name="weight" type="text"  value={specie.weight} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="length" className="form-label">Known Length(s)</span>
    <input className="form-control" id="length" name="length" type="text"  value={specie.length} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="location" className="form-label">Known Location(s)</span>
    <input className="form-control" id="location" name="location" type="text"  value={specie.location} onChange={handleChangeSpecies} />
  </div>


<div className="input-group input-group-sm mb-3">
  <span htmlFor="distinctive_feature" className="form-label">Distinctive Feature(s)</span>
    <input className="form-control" id="distinctive_feature" name="distinctive_feature" type="text"  value={specie.distinctive_feature} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="distinctive_feature" className="form-label">Habitat</span>
    <input className="form-control" id="habitat" name="habitat" type="text"  value={specie.habitat} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="predators" className="form-label">Predators</span>
    <input className="form-control" id="predators" name="predators" type="text"  value={specie.predators} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="favorite_food" className="form-label">Favorite Food</span>
    <input className="form-control" id="favorite_food" name="favorite_food" type="text"  value={specie.favorite_food} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="main_prey" className="form-label">Main Pray</span>
    <input className="form-control" id="main_prey" name="main_prey" type="text"  value={specie.main_prey} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="main_prsloganey" className="form-label">Slogan</span>
    <input className="form-control" id="slogan" name="slogan" type="text"  value={specie.slogan} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="lifestyle" className="form-label">Life Style</span>
    <input className="form-control" id="lifestyle" name="lifestyle" type="text"  value={specie.lifestyle} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="skin_type" className="form-label">Skin Type</span>
    <input className="form-control" id="skin_type" name="skin_type" type="text"  value={specie.skin_type} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="top_speed" className="form-label">Top Speed</span>
    <input className="form-control" id="top_speed" name="top_speed" type="text"  value={specie.top_speed} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group input-group-sm mb-3">
  <span htmlFor="lifespan" className="form-label">Life Span</span>
    <input className="form-control" id="lifespan" name="lifespan" type="text"  value={specie.lifespan} onChange={handleChangeSpecies} />
  </div>
  <div className="input-group mb-3">
    <span htmlFor="note" className="form-label"> Notes: </span>
      <textarea className ="form-control" id="note" name="note" onChange={handleChangeSpecies} >
      {specie.notes}
      </textarea>
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
