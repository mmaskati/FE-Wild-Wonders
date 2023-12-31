import React from 'react';
// import Axios from 'axios';
// import { useState } from 'react';

import SightseerForm from '../../components/sightseer/SightseerForm';
import AdminUserList from '../../components/admin/UserList';

export default function Dashboard(props) {


//Mazen - callback API for Scientist Dashboard
// const scientistDashboard = () => {
//   Axios.post("scientist/dashboard")
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
// }



  return (
    <>
<div className="container mt-5">
  
        <h5>Dashboard</h5>

    <p>Welcome {props.userData.firstName} {props.userData.lastName},</p>

    {/* {scientistDashboard} */}

    { props.isAuth && props.userData.userType==3 ? <> <SightseerForm /> </> : <span></span> }
    { props.isAuth && props.userData.userType==1 ? <> <AdminUserList /> </> : <span></span> }

</div>
</>
  )
}
