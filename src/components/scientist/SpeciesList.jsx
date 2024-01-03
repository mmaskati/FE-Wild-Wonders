import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Axios from 'axios'; //AJAX functionality for React (npm i axios)
import Species from './Species';
import SpeciesCreateForm from './SpeciesCreateForm';
import SpeciesEditForm from './SpeciesEditForm';

// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { InputText } from "primereact/inputtext";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

export default function SpeciesList(props) {

// const [globalFilter, setGlobalFilter] = useState(null);

// const header = (
//     <div className="table-header">
//         <h5>Species List</h5>
//         <InputText
//             type="search"
//             onInput={(e) => setGlobalFilter(e.target.value)}
//             placeholder="Search"
//         />
//     </div>
// );

const [species, setSpecies] = useState([]); //this is used for Create
// const [isEditSpecies, setIsEditSpecies] = useState(false); //this is used for Edit
const [currentSpecies, setCurrentSpecies] = useState({}); //this is used to set the content for the Edit form

const passToken = { headers: { "Authorization": "Bearer " + localStorage.getItem("token")}};

// const passToken = props.passedToken;

useEffect(() => {
//call API
loadSpeciesList();

},[]); //this end array is the conditional option

//using axios for the API fetching GET 
const loadSpeciesList = () => {
Axios.get("species/index", passToken)
.then((response) => {
console.log(response);
setSpecies(response.data.species);
})
.catch((error) => {
console.log(error);
})
};

//create the API for creating the Species
const addSpecies = (specie) => {
Axios.post("species/add", specie, passToken) //this is passToken defined earlier
.then((response) => { 
    console.log("Species Added Successfully!");
    loadSpeciesList();
    })
.catch((error) => {
    console.error("Error Adding Species: " + error);
    })
}

//create the API for preparing the content for the Edit Form
const editView = (id) => {
// console.log(passToken)
Axios.get(`species/edit?id=${id}`, passToken)
.then( ( res ) => {
    // console.log("Loaded Species Information");
    // console.log(res.data.specie);
    let specie = res.data.species;
    props.setIsEditSpecies(true);
    setCurrentSpecies(specie);
})
.catch((error) => {
    console.log("Error loading specie Information: ");
    console.log(error);
})
}

//create the API for Update Species 
const updateSpecies = (species) => {
Axios.post("species/update",species, passToken)
.then(( res ) => {
    console.log("Species Updated Successfully!");
    console.log(res);
    loadSpeciesList();
    props.setIsEditSpecies(false); //reset to hide the form again
})
.catch((error) => {
    console.log("Error Updating Species Information: ");
    console.log(error); 
})
}

//create Delete API to Delete Species
const deleteSpecies = (id) => {
Axios.get(`species/delete?id=${id}`, passToken)
.then(( res ) => {
    console.log("Species Deleted Successfully!");
    // console.log(res);
    loadSpeciesList();
})
.catch((error) => {
    console.log("Error finding the Species Information: ");
    console.log(error);
})
}

//return arrow function with normal bracket as it treats this as one value
const allSpecies = species.map((specie, index) => (
<tr key={index}>
    {/* <Species name={specie.name} emailAddress={specie.emailAddress} index={index} /> */}
    <Species {...specie} index={index+1} editView={editView} deleteSpecies={deleteSpecies} />
</tr>    
))

let speciesArray;
speciesArray = [];

const allDataSpecies = species.map((specie, index) => (
//{...specie}

speciesArray.push({...specie})

    ))

console.log(speciesArray);

return (
<>

<div className="container py-5 mb-5">

{/* <SpeciesCreateForm addSpecies={addSpecies} /> */}

{(props.isCreateSpecies) ? 
    <>
        <SpeciesCreateForm userID={props.userID} passToken={passToken} addSpecies={addSpecies} isCreateSpecies={props.isCreateSpecies} setIsEditSpecies={props.setIsCreateSpecies} />
    </>
    :

    (props.isEditSpecies) ? 
        <>
            <SpeciesEditForm key={currentSpecies._id} specie={currentSpecies} updateSpecies={updateSpecies} isEditSpecies={props.isEditSpecies} setIsEditSpecies={props.setIsEditSpecies} /> 
        </>
        : 
    <>   
    <button onClick={() => props.setIsCreateSpecies(true)} className="btn btn-success">Add Species</button>
    <br />
    <br />
    <h5> Species List</h5>
    <table className="table">
    <tbody>
        <tr className="table-success">
            <th>No.</th>
            <th>Name</th>
            <th>Common Name</th>
            <th>Type</th>
            <th>Weight</th>
            <th>Length</th>
            <th>Color</th>
            <th>Location</th>
            <th>Actions(s)</th>
        </tr>
            { allSpecies != null ? allSpecies : "No data" }
        </tbody>
    </table>

    {/* <DataTable
                className="table table-striped"
                value={speciesArray}
                paginator
                rows={10}
                showGridlines
                removableSort
                globalFilter={globalFilter}
                header={header}>

                <Column field="name" sortable header="Name"></Column>
                <Column field="characteristics.common_name" sortable header="Common Name"></Column>
                <Column field="characteristics.speciestype" sortable header="Type"></Column>
                <Column field="characteristics.weight" sortable header="Weight"></Column>
                <Column field="characteristics.length" sortable header="Length"></Column>
                <Column field="characteristics.color" sortable header="Color"></Column>
                <Column field="characteristics.location" sortable header="Location"></Column>
            </DataTable> */}
        </>
}

</div>


</>

)

}

