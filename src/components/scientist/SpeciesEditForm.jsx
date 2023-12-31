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
<div className="mb-3 pb-1">
    <label htmlFor="name" className="form-label">Species Name</label>
    <input className="form-control" id="name" name="name" type="text" onChange={handleChange} value={specie.name} required />
  </div>

  <div className="mb-3 pb-1">
    <label htmlFor="common_name" className="form-label">Common Name</label>
    <input className="form-control" id="common_name" name="common_name" type="text" onChange={handleChange} value={specie.characteristics.common_name}  />
  </div>
<br />
<h5>Characteristics</h5>

<div className="mb-3 pb-1">
  <label htmlFor="speciestype" className="form-label">Species Type</label>
    <input className="form-control" id="speciestype" name="speciestype" type="text"  value={specie.characteristics.speciestype} onChange={handleChange}  />
  </div>

  <div className="mb-3 pb-1">
  <label htmlFor="color" className="form-label">Color(s)</label>
    <input className="form-control" id="color" name="color" type="text"  value={specie.characteristics.color} onChange={handleChange} />
  </div>

  <div className="mb-3 pb-1">
  <label htmlFor="weight" className="form-label">Known Weight(s)</label>
    <input className="form-control" id="weight" name="weight" type="text"  value={specie.characteristics.weight} onChange={handleChange} />
  </div>

  <div className="mb-3 pb-1">
  <label htmlFor="length" className="form-label">Knwon Length(s)</label>
    <input className="form-control" id="length" name="length" type="text"  value={specie.characteristics.length} onChange={handleChange} />
  </div>

  <div className="mb-3 pb-1">
  <label htmlFor="location" className="form-label">Knwon Location(s)</label>
    <input className="form-control" id="location" name="location" type="text"  value={specie.characteristics.location} onChange={handleChange} />
  </div>
  
  <br />
  {/* <div className="w-100"> */}
  <button onClick={ () => props.isEdit(false) } className="btn btn-secondary me-2">Cancel</button> <button className="btn btn-warning" type="submit">Update</button>
  {/* </div> */}
</form>

</div>
</>
)
}
