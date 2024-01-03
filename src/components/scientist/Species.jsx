import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Species(props) {
  return (
    <>
    <td>{props.index}</td>
    <td>{props.name}</td>
    <td>{props.common_name}</td>
    <td>{props.speciestype}</td>
    <td>{props.weight}</td>
    <td>{props.length}</td>
    <td>{props.color}</td>
    <td>{props.location}</td>
    <td>
      <button onClick={() => props.editView(props._id)} className="btn btn-sm btn-warning"><FontAwesomeIcon icon="pencil" /></button> <button onClick={() => props.deleteSpecies(props._id)} className="btn btn-sm btn-danger"><FontAwesomeIcon icon="trash" /></button>
    </td>
    </>
  )
}
