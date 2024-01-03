import React from 'react';
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Axios from 'axios'; //AJAX functionality for React (npm i axios)
import Record from './Record';
// import RecordCreateForm from './RecordCreateForm';
import RecordEditForm from './RecordEditForm';
// import RecordCreateForm from '../sightseer/RecordFormCreate';
import RecordCreateForm from '../sightseer/SightseerForm';
// import RecordEditForm from './RecordEditForm';

export default function RecordList(props) {
const [records, setRecord] = useState([]); //this is used for Create
const [currentRecord, setCurrentRecord] = useState({}); //this is used to set the content for the Edit form

const passToken = { headers: { "Authorization": "Bearer " + localStorage.getItem("token")}};

// const passToken = props.passedToken;

useEffect(() => {
//call API
loadRecordList();

},[]); //this end array is the conditional option

//using axios for the API fetching GET 
const loadRecordList = () => {
Axios.get("record/index", passToken)
.then((response) => {
console.log(response);
setRecord(response.data.records);
})
.catch((error) => {
console.log(error);
})
};

//create the API for creating the Record
const addRecord = (record) => {
    console.log(record)
Axios.post("record/add", record, passToken) //this is passToken defined earlier
.then((response) => { 
    console.log("Record Added Successfully!");
    props.setIsCreateRecord(false);
    props.setIsEditRecord(false); //reset to hide the form again
    loadRecordList();
    })
.catch((error) => {
    console.error("Error Adding Record: " + error);
    })
}

//create the API for preparing the content for the Edit Form
const editView = (id) => {
// console.log(passToken)
Axios.get(`record/edit?id=${id}`, passToken)
.then( ( res ) => {
    // console.log("Loaded Record Information");
    // console.log(res.data.record);
    let record = res.data.record;
    props.setIsEditRecord(true);
    setCurrentRecord(record);
})
.catch((error) => {
    console.log("Error loading record Information: ");
    console.log(error);
})
}

//create the API for Update Record 
const updateRecord = (records) => {
Axios.post("record/update",records, passToken)
.then(( res ) => {
    console.log("Record Updated Successfully!");
    console.log(res);
    props.setIsCreateRecord(false);
    props.setIsEditRecord(false); //reset to hide the form again
    loadRecordList();
})
.catch((error) => {
    console.log("Error Updating Record Information: ");
    console.log(error); 
})
}

//create Delete API to Delete Record
const deleteRecord = (id) => {
Axios.get(`record/delete?id=${id}`, passToken)
.then(( res ) => {
    console.log("Record Deleted Successfully!");
    // console.log(res);
    loadRecordList();
})
.catch((error) => {
    console.log("Error finding the Record Information: ");
    console.log(error);
})
}

//return arrow function with normal bracket as it treats this as one value
const allRecord = records.map((record, index) => (
<tr key={index}>
    {/* <Record name={record.name} emailAddress={record.emailAddress} index={index} /> */}
    <Record {...record} index={index+1} editView={editView} deleteRecord={deleteRecord} isEditRecord={props.isEditRecord} setIsEditRecord={props.setIsEditRecord} />
</tr>    
))

return (
<>



<div className="container py-5 mb-5">

    {(props.isCreateRecord) ?
    <>
    <RecordCreateForm userID={props.userID} passToken={passToken} addRecord={addRecord} isCreateRecord={props.isCreateRecord} setIsCreateRecord={props.setIsCreateRecord } />
    </>
        : 
    
    (props.isEditRecord) ?
        <>
        <RecordEditForm userID={props.userID} key={currentRecord._id} record={currentRecord} editView={editView} updateRecord={updateRecord} isEditRecord={props.isEditRecord} setIsEditRecord={props.setIsEditRecord} />
        </>
    :
    <>
    <button onClick={() => props.setIsCreateRecord(true)} className="btn btn-primary">Add Record</button>
    <br />
    <br />
    <h5> Record List</h5>
    <table className="table">
    <tbody>
        <tr className="table-success">
        <th>No.</th>
        <th>Species</th>
        <th>Date / Time</th>
        <th>Location</th>
        <th>Longitude</th>
        <th>Latitude</th>
        {/* <th>Image</th> */}
        <th>Note(s)</th>
        <th>Actions(s)</th>
        </tr>
            { allRecord != null ? allRecord : "No data" }
        </tbody>
    </table>
</>
}
</div>


</>
)

}

