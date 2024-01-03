import React from 'react';
// import Axios from 'axios';
// import { useState } from 'react';

// import SightseerForm from '../../components/sightseer/SightseerForm';
import AdminUserList from '../../components/admin/UserList';

import RecordList from '../../components/record/RecordList';




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
  
    <h4>Dashboard - {props.userData.userType == 1 ? "Administrator" : props.userData.userType == 2 ? "Scientist" : props.userData.userType == 3 ? "Contributor" : "" }</h4>

    <p>Welcome {props.userData.firstName} {props.userData.lastName},</p>
    {/* Phone: {props.userData.phoneNumber}<br />
    Email: {props.userData.emailAddress}<br /> */}

    {/* {scientistDashboard} */}

    {/* { props.isAuth && props.userData.userType==3 ? <> <RecordList /> </> : <span></span> } */}
    {/* { isAuth && userData.userType==1 ? <AdminUserList /> : <Signin login={loginHandler} warning={warning} /> } */}
    

</div>
</>
  )
}
