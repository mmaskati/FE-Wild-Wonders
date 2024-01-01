import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { Link } from "react-router-dom";

export default function UserEditForm(props) {

const [user, setEditUser] = useState(props.user);

const handleChange = (event) => {
  //define the attributes from the form you need
  const attributeToChange = event.target.name;
  //define the values for those attributes
  const editValue = event.target.value;

  const updatedUser = {...user};
  updatedUser[attributeToChange] = editValue;
  // console.log(updatedUser);
  setEditUser(updatedUser);
}

const handleSubmit = (event) => {
    event.preventDefault();
    props.updateUserProfile(user);
    event.target.reset(); //clear the form
}

return (
<>
<div className="container py-5 mb-5">
<h5><FontAwesomeIcon icon="pencil" /> Edit User Profile</h5>

{/* <span> {props.user._id}</span> */}

<div className="table center">

<form onSubmit={handleSubmit} autoComplete="off">
<div className="mb-3 pb-1">
    <label htmlFor="firstName" className="form-label">First Name</label>
    <input className="form-control" id="firstName" name="firstName" type="text" onChange={handleChange} value={user.firstName} required />
</div>
<div className="mb-3 pb-1">
    <label htmlFor="lastName" className="form-label">Last Name</label>
    <input className="form-control" id="lastName" name="lastName" type="text" onChange={handleChange} value={user.lastName} required />
</div>

<div className="mb-3 pb-1">
    <label htmlFor="emailAddress" className="form-label">Email Address</label>
    <input className="form-control" id="emailAddress" name="emailAddress" type="email" onChange={handleChange} value={user.emailAddress} required />
</div>

<div className="mb-3 pb-1">
    <label htmlFor="password" className="form-label">Reset Password (Optional)</label>
    <input className="form-control" id="password" name="password" type="text" onChange={handleChange} value={user.password} />
</div>

{/* <div className="mb-3 pb-1">
    <label htmlFor="userType" className="form-label">User Type</label>
    <select onChange={handleChange} id="userType" name="userType" className="form-select" required>

        <option key={user.userType} value={user.userType} selected>
        {user.userType == 1 ? "Administrator" : user.userType == 2 ? "Scientist" : user.userType == 3 ? "Contributor" : "" }    
        </option>

        {user.userType != 1 ? <option key={1} value={1}>Administrator</option> : "" }
        {user.userType != 2 ? <option key={2} value={2}>Scientist</option> : "" }
        {user.userType != 3 ? <option key={3} value={3}>Contributor</option> : "" }

    </select>
</div> */}

<div className="mb-3 pb-1">
    <label htmlFor="phoneNumber" className="form-label">Phone Number (Optional)</label>
    <input className="form-control" id="phoneNumber" name="phoneNumber" type="number" onChange={handleChange} value={user.phoneNumber} />
</div>

  <br />
  {/* <div className="w-100"> */}
  <button onClick={ () => props.isEdit(false) } className="btn btn-secondary me-2">Cancel</button> <button className="btn btn-warning" type="submit">Update</button>
  {/* </div> */}
</form>

</div>
</div>
</>
)
}
