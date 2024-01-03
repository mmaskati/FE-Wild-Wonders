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

</>
)
}
