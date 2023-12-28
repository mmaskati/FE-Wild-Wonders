import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

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

library.add(faUser, faPencil, faTrash, faUserPlus, faStar);

function App() {

//declare states
const [isAuth, setIsAuth] = useState(false);
const [user, setUser] = useState({});

//we need to trigger the user/token check if the user is logged in everytime a page is refreshed even
useEffect(() => {
  const user = getUser();
  console.log(user);///////////////////////////////////////////////////////////////////////////////////////////

  //if there is a user then keep everything in check
  if(user){
    setIsAuth(true);
    setUser(true);
  } else {
    //else set to false/null and remove token from local storage
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  }

}, []);

const registerHandler = (user) => {
  Axios.post("auth/signup", user)
  .then((response) => {
    console.log(response);
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

    //we need to validate the token
    let token = response.data.token;
    if(token != null){
      //store the token in the browser local storage
      localStorage.setItem("token", token);
      const user = getUser();
      console.log(user);
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

return (
<>
<nav>
<header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
           <span className="fs-2">Wild Wonders</span>
        </a>

        <nav>
        <div className="text-end">

        { isAuth ? (
          
          <>
          <Link to="/" className="btn btn-outline-light me-2">Home</Link>
          <Link to="/logout" className="btn btn-outline-danger" onClick={onLogoutHandler}>Logout</Link>
          </>

          ) : (
          
          <>
          <Link to="/signup" className="btn btn-warning me-2">Sign Up</Link>
          <Link className="btn btn-outline-success me-2" to="/signin">Login</Link>
          </>
          
        ) }

        </div>
        </nav>

      </div>
    </div>
</header>

  {/* <Header isAuth={isAuth} user={user} /> */}

</nav>

<div className="container mt-5">
    
<main>
    <Routes>
      <Route path="/" element={ isAuth ? "You are logged in." : <Signin login={loginHandler}></Signin>}></Route>
      <Route path="/signup" element={<Signup register={registerHandler}></Signup>}></Route>
      <Route path="/signin" element={ isAuth ? "You are logged in." : <Signin login={loginHandler}></Signin>}></Route>
    </Routes>
</main>
  
</div>

<Footer />

</>
);
}

export default App;
