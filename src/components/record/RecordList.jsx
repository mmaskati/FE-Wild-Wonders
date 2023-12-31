
import React, { useEffect } from 'react'
import Axios from 'axios'
import Record from './Record';
import { useState } from 'react';
import RecordCreateForm from './RecordCreateForm';
import RecordEditForm from './RecordEditForm';

export default function RecordList() {

    const [records, setRecords] = useState([]);
    const[isEdit,setIsEdit]=useState(false);
    const [currentRecord,setCurrentRecord]=useState([]);

    useEffect(() => {
      //Call API 
      loadRecordList()
    }, [])
    
    const loadRecordList = () =>{
        Axios.get("record/index")
        .then((response)=> {
            console.log(response)
            setRecords(response.data.records)
        })
        .catch((err) =>{
            console.log(err);
        })
    }
const addRecord= (record) =>{
    Axios.post("record/add",record, {
         headers : {
        "Recordization":"Bearer " + localStorage.getItem("token")
    }
      
    }) 
    
    .then(res =>{
        console.log("record Added!");
        loadRecordList();
    })
    .catch((err) =>{
        console.log("Error in adding!");
        console.log(err);
    })
}

const editView = (id) =>{
    Axios.get(`record/edit?id=${id}`)
    .then((res) =>{
        console.log(res.data.record);
        console.log("Loaded Record Information");
        let record= res.data.record;
        setIsEdit(true);
        setCurrentRecord(record);

    })
    .catch(err =>{
        console.log("Error in loading information!");
        console.log(err);
    })
}

const updateRecord = (record) =>{
    Axios.put('record/update',record)
    .then(res =>{
        console.log(res);
        console.log("Loaded  Information updated");
        loadRecordList();

    })
    .catch(err =>{
        console.log("Error in loading information!");
        console.log(err);
    })
}
const deleteRecord = (id) =>{
    Axios.get(`record/delete?id=${id}`)
    .then(res =>{
        
        console.log("Record  Information deleted!");
        console.log(res);
        loadRecordList();

    })
    .catch(err =>{
        console.log("Error in deleting information!");
        console.log(err);
    })
}
    const allrecords = records.map((record,index) =>(
        <tr key={index}>
        <Record {...record} editView={editView} deleteRecord={deleteRecord}/>
        </tr>
    ))
        
    
  return (
    <div><h1>RecordList</h1>
    <div>
        <table>
            <tbody>
                <tr>
                    <th>
                        Species
                    </th>
                    <th>
                       Date
                    </th>
                    <th>
                       Time
                    </th>
                    <th>
                    Location
                    </th>
                    <th>
                    Location Longitude
                    </th>
                    <th>
                    Location Latitude
                    </th>
                    <th>
                      edit
                    </th>
                </tr>
                {allrecords}
            </tbody>
        </table>
    </div>{(!isEdit)?
    <RecordCreateForm  addRecord={addRecord}></RecordCreateForm>
    :
    <RecordEditForm key={currentRecord._id} record={currentRecord} updateRecord={updateRecord}></RecordEditForm>
}
    </div>
  )
}

//rcc
//rfc