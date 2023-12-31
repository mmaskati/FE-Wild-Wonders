import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// import "leaflet/dist/leaflet.css";
import React from "react";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Header from './components/page/Header';
import Footer from './components/page/Footer';

import { Routes, Route, Link } from "react-router-dom";
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import Signup from './components/user/Signup';
import Signin from './components/user/Signin';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faPencil, faTrash, faUserPlus, faStar } from "@fortawesome/free-solid-svg-icons";

//SightseerForm - Wael
// import SightseerForm from "./components/sightseer/SightseerForm";


//Mazen - adding Scientist View
import Dashboard from './components/scientist/Dashboard';
// import Map from './components/scientist/Map';
import Leaflet from './components/scientist/Leaflet';
import About from './components/page/About';
//Admin User
import AdminUserList from './components/admin/UserList';

library.add(faUser, faPencil, faTrash, faUserPlus, faStar);

function App() {

//declare states
const [isAuth, setIsAuth] = useState(false);
const [user, setUser] = useState({});
const [userData, setuserData] = useState({});
const [signedUp, setSignedUp] = useState(false);
const [userType, setUserType] = useState(0);

const [warning, setWarning] = useState('');
// const [showModal, setShowModal] = useState("none");

// const handleClose = () => setShowModal("modal");
// const handleShow = () => setShowModal(true);

//we need to trigger the user/token check if the user is logged in everytime a page is refreshed even
useEffect(() => {
  // console.count('useEffect');
  const user = getUser();
  // console.log(user);

  //if there is a user then keep everything in check
  if(user){
    setIsAuth(true);
    setUser(true);

    setUserType(userType);

//call user fetch data
  // setTimeout(
  //   ()=>fetchUserData(user.id)
  // )
  fetchUserData(user.id);
  

  } else {
    //else set to false/null and remove token from local storage
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  }



}, []);

//MAZEN - API GET USER PROFILE
const fetchUserData = (id) => {
  //console.log(id);
  Axios.post("user/fetch", { userID: id })
  .then((response) => {
    setuserData(response.data.userDetails);
    // console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })
}

const registerHandler = (user) => {
  Axios.post("auth/signup", user)
  .then((response) => {
    //console.log(response);
    setSignedUp(true);
    //from here we can do useNavigate using hooks like navigate("/") >>>
  })
  .catch((error) => {
    console.log(error);
  })
}

//we need to decrypt the token received once the signin happens and validate that the user is using the same token
const getUser = () => {
  const token = getToken();
  //need to install jwtDecode (npm i jwt-decode) in the F.E.
  return token ? jwtDecode(token).user : null; 
}

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
}

const onLogoutHandler = (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  setIsAuth(false);
  setUser(null);
}

const loginHandler = (credentials) => {
  Axios.post("auth/signin", credentials)
  .then(( response ) => {
    console.log(response.data.token);
    setWarning('Login Error! Try again.');

    //we need to validate the token
    let token = response.data.token;
    if(token != null){
      //store the token in the browser local storage
      localStorage.setItem("token", token);
      const user = getUser();

      if(user){ 
        // setShowModal("modal");
        fetchUserData(user.id);
      }

      // console.log(user);
      user ? setIsAuth(true) : setIsAuth(false);
      user ? setUser(true) : setUser(null);
      
    }
  })
  
  .catch(( error ) => {
    
    console.log(error);

    //reset the user and log them out when there is any error with login handling
    setIsAuth(false);
    setUser(false);
    setUser(null);
  })
}

// console.log(userData);

return (
<>
<nav className="container-fluid p-0">

    <header className="p-3 text-bg-dark">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
           <span className="fs-2">Wild Wonders</span>
        </a>

        <nav>
        <div className="text-end">

        { isAuth ? 
        
          <>
            { userData.userType == 1 ? <Link to="/map" className="btn btn-outline-primary me-2">Admin Map</Link> : <></> }
            { userData.userType == 2 ? <Link to="/map" className="btn btn-outline-primary me-2">Scientist Map</Link> : <></> }
            { userData.userType == 3 ? <Link to="/" className="btn btn-outline-light me-2">Home</Link> : <></> }
          

            <Link to="/logout" className="btn btn-outline-danger" onClick={onLogoutHandler}>Logout</Link>
          </>

          : 
          
          <>
          <Link to="/signup" className="btn btn-warning me-2">Sign Up</Link>
          <Link className="btn btn-outline-success me-2" to="/signin">Login</Link>
          <button type="button" className="btn btn-bd-primary me-2 px-5" data-bs-toggle="modal" data-bs-target="#exampleModal">About</button>
          </>
          
        }

        <>
        
        </>

        </div>
        </nav>

      </div>
      </header>

  {/* <Header isAuth={isAuth} user={user} /> */}

{/* <div className="artboard">
    <div className="button">
      <svg id="ylw-btn" xmlns="http://www.w3.org/2000/svg" width="150" height="45" preserveAspectRatio="none" viewBox="0 0 150 45">
          <title>Click Me Button</title>
          <rect id="btn-box" width="150" height="45" fill="#ffd600" />
          <text id="btn-txt" transform="translate(26.9 28.4)" fontSize="20.92" fill="#231f20" fontFamily="Open Sans" fontWeight="700">CLICK ME</text>
      </svg>
    </div>
  </div>
  <div className="thankyou">
    <div className="close">
      <svg id="close-btn" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
          <path className="cls-1" d="M16.78,13.33l8.84-8.84A2.44,2.44,0,0,0,22.17,1L13.33,9.89,4.49,1A2.44,2.44,0,0,0,1,4.49l8.84,8.84L1,22.17a2.44,2.44,0,1,0,3.45,3.45l8.84-8.84,8.84,8.84a2.44,2.44,0,0,0,3.45-3.45Z" transform="translate(-0.33 -0.33)" />
      </svg>
    </div>
    <div className="section-content">
      <h2>Thanks</h2>
      <p>Thank you for getting in contact with us. We will contact you within 24 hours.</p>
    </div>
</div> */}

</nav>

<div className="container-fluid p-0">
    {/* {JSON.stringify(userData)} */}
<main>
    <Routes>
      <Route path="/signup" element={ signedUp ? <Signin login={loginHandler} warning={warning} /> : <Signup register={registerHandler} /> }></Route>
      <Route path="/signin" element={ isAuth ? <Dashboard isAuth={isAuth} userData={userData} /> : <Signin login={loginHandler} /> }></Route>

      <Route path="/" element={ isAuth ? <Dashboard isAuth={isAuth} userData={userData} /> : <Leaflet /> }></Route>
      <Route path="/map" element={ isAuth ? <Leaflet /> : <Signin login={loginHandler} warning={warning} /> }></Route>
    </Routes>
</main>
  
</div>
    
    
    {/* <div className="container pb-5 mb-5">

    </div> */}

<About />
<Footer />

</>
);
}

export default App;
