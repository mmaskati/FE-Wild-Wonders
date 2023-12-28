import React from 'react';
import { useState } from 'react';

export default function Signin(props) {

const [newUser, setNewUser] = useState({});

const handleChange = (e) => {
    const user = {...newUser};
    user[e.target.name] = e.target.value;
    //console.log(user);
    setNewUser(user);
};

const loginHandler = (event) => {
    event.preventDefault();
    // console.log(newUser);
    props.login(newUser);
    event.target.reset();
};

  return (
    
    <>
 
<div className="form-signin w-100 m-auto">

<form onSubmit={loginHandler} autoComplete="off" >
  
    <h1 className="h3 mb-3 fw-normal">Sign in</h1>

    <div className="form-floating">
      <input type="email" placeholder="Email" id="emailAddress" name="emailAddress" className="form-control" onChange={handleChange} required />
      <label htmlFor="emailAddress">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" name="password" id="password" placeholder="Enter Password" className="form-control" onChange={handleChange} required />
      <label htmlFor="password">Password</label>
    </div>

    <button className="btn btn-bd-primary w-100 py-2" type="submit">Login</button>

  </form>
</div>

    </>

  )
}
