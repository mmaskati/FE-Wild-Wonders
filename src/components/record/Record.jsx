import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);

export default function Record(props) {
  return (
    <>
    <td>{props.index}</td>
    {/* {JSON.stringify(props)} */}
    <td>{JSON.stringify(props.species.name)}</td>
    <td>{dayjs(props.date).format('YYYY-MM-DD HH:mm')}</td>
    <td>{props.location}</td>
    <td>{props.locationLongitude}</td>
    <td>{props.locationLatitude}</td>
    {/* <td>{props.image}</td> */}
    <td>{props.notes}</td>
    <td>
    <button type="button" onClick={() => props.editView(props._id)} className="btn btn-sm btn-warning"><FontAwesomeIcon icon="pencil" /></button> <button type="button" onClick={() => props.deleteRecord(props._id)} className="btn btn-sm btn-danger"><FontAwesomeIcon icon="trash"/></button>
    </td>
    </>
  )
}