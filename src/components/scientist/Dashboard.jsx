import React from 'react';

export default function Dashboard(props) {
  return (
    <>
    <div>
        <h5>Dashboard</h5>

    <p>Welcome {props.userData.firstName} {props.userData.lastName},</p>

    </div>
    </>
  )
}
