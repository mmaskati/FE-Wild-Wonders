import React from 'react';
import { useState, useEffect } from 'react';
import User from './User';

import Axios from 'axios';

export default function UserList(props) {

const [users, setUsers] = useState([]);

const [newRecord, setnewRecord] = useState({});

const handleChange = (e) => {
    const user = {...newRecord};
    user[e.target.name] = e.target.value;
    //console.log(user);
    setnewRecord(user);
};

const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(newRecord);
    props.login(newRecord);
    event.target.reset();
};

useEffect(() => {
//call API
loadUserList();

},[]); //this end array is the conditional option

//using axios for the API fetching GET 
const loadUserList = () => {
Axios.get("user/index")
    .then((response) => {
    console.log(response);
    setUsers(response.data.users);
    })
    .catch((error) => {
    console.log(error);
    })
};

const allUsers = users.map((user, index) => (
  <tr key={index}>
      <User {...user} index={index+1} />
  </tr>    
))

  return (
    
<>
<div className="container py-5 mb-5">

<h5>Admin User List</h5>

<table className="table">
        <tbody>
            <tr className="table-primary">
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Actions(s)</th>
            </tr>
                {allUsers}
            </tbody>
        </table>

</div>
</>

  )
}
