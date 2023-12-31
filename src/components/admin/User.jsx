import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function User(props) {
  return (
    <>
    <td>{props.index}</td>
    <td>{props.firstName} {props.lastName}</td>
    <td>{props.emailAddress}</td>
    <td>{props.phoneNumber}</td>
    <td>{props.userType == 1 ? "Admin" : props.userType == 2 ? "Scientist" : props.userType == 3 ? "Contributor" : "" }</td>
    <td>
        <button onClick={() => props.editView(props._id)} className="btn btn-sm btn-warning"><FontAwesomeIcon icon="pencil" /></button> <button onClick={() => props.deleteUser(props._id)} className="btn btn-sm btn-danger"><FontAwesomeIcon icon="trash" /></button>
    </td>
    </>
  )
}