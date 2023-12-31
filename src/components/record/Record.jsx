import React from 'react'

export default function Record(props) {
  return (
    <>
    <td>{props.species._id}</td>
    <td>{props.date}</td>
    <td>{props.time}</td>
    <td>{props.location}</td>
    <td>{props.locationLongitude}</td>
    <td>{props.locationLatitude}</td>
    <td><button onClick={() => props.editView(props._id)}>Edit</button></td>
    <td><button onClick={() => props.deleteRecord(props._id)}>delete</button></td>
    </>
  )
}