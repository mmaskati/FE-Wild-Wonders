import React from 'react';
// import Axios from 'axios';
// import { useState } from 'react';
import About from './About';

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
  
    <h4>Dashboard - <span className="btn btn-primary">{props.userData.userType == 1 ? "Administrator" : props.userData.userType == 2 ? "Scientist" : props.userData.userType == 3 ? "Contributor" : "" }</span></h4>

    <p>Welcome {props.userData.firstName} {props.userData.lastName},</p>
    {/* Phone: {props.userData.phoneNumber}<br />
    Email: {props.userData.emailAddress}<br /> */}

    {/* {scientistDashboard} */}

    {/* { props.isAuth && props.userData.userType==3 ? <> <RecordList /> </> : <span></span> } */}
    {/* { isAuth && userData.userType==1 ? <AdminUserList /> : <Signin login={loginHandler} warning={warning} /> } */}

    <h1>About Wild Wonders</h1>

    <h5>Wild Wonders is all about Wildlife Sightseers meeting Scientists</h5>
      <div className="alert alert-success" role="alert">
        <span>Become a Citizen Scientist: Help Track Wildlife Across the Globe!</span>
      </div>
      <p>Help identify and locate animal species around the world and in your region to assist scientists with field surveys.</p>

<h5>Wild Wonders: Where your vacation snaps become invaluable science.</h5>
<p>Ever seen a pod of dolphins glide through turquoise waters or a majestic eagle soar across mountain peaks? Now, your breathtaking holiday photos can become vital data for scientists studying and protecting our planet's incredible wildlife.</p>
<br />
<p>Wild Wonders connects nature enthusiasts like you with marine biologists, ecologists, conservationists, and more. By uploading your photos of any land or marine species, you become a citizen scientist, contributing to crucial research on migration patterns, population health, and habitat changes.</p>
<br />
<h5>Here's how it works:</h5>

<p>Capture wildlife encounters:</p>
<br/>
<ul>
<li>Snap photos of any animal you see, from sharks, turtles, whales breaching in the ocean to birds or butterflies flitting in parks.</li>
<li>Find a science project survey to contribute on Wild Wonders.</li>
<li>Upload your photos: Share your captures on our easy-to-use platform.</li>
<li>Help scientists analyze: Experts identify species, map sightings, and track vital data from your contributions.</li>
<li>Make a difference: Your photos contribute to research that informs conservation efforts, protects endangered species, and ensures the future of our planet's amazing biodiversity.</li>
</ul>
<br />
<p>Join the Wild Sight community and:</p>
<br />
<ul>
<li>Become a valuable citizen scientist.</li>
<li>Learn about and contribute to vital wildlife research.</li>
<li>Connect with nature enthusiasts like yourself.</li>
<li>Make a lasting impact on the future of wildlife.</li>
</ul>
<br />
<p>Visit Wild Wonders today and turn your unforgettable encounters into groundbreaking science!</p>
<br />
<p>Together, we can track wildlife across the globe, protect threatened species, and ensure a thriving future for the natural world.</p>
<br />


</div>
</>
  )
}
