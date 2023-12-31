import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Species(props) {
  return (
    <>
    <td>{props.index}</td>
    <td>{props.name}</td>
    <td>{props.characteristics.common_name}</td>
    <td>{props.characteristics.speciestype}</td>
    <td>{props.characteristics.weight}</td>
    <td>{props.characteristics.length}</td>
    <td>{props.characteristics.color}</td>
    <td>{props.characteristics.location}</td>
    <td>
      <button onClick={() => props.editView(props._id)} className="btn btn-sm btn-warning"><FontAwesomeIcon icon="pencil" /></button> <button onClick={() => props.deleteSpecies(props._id)} className="btn btn-sm btn-danger"><FontAwesomeIcon icon="trash" /></button>
    </td>
    </>
  )
}
