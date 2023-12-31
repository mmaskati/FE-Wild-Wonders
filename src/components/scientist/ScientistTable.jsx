import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ScientistTable = () => {
  const [scientists, setScientists] = useState([
    { id: 1, name: '', email: '', phone: '', species: '', note: '' }
    // Add more scientists as needed
  ]);

  const handleDelete = (id) => {
    const updatedScientists = scientists.filter((scientist) => scientist.id !== id);
    setScientists(updatedScientists);
  };

  return (
    <div className="container mt-4">
      <h2>User Info. Table</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone</th>
            <th>Species</th>
            <th>Note</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scientists.map((scientist) => (
            <tr key={scientist.id}>
              <td>{scientist.name}</td>
              <td>{scientist.email}</td>
              <td>{scientist.phone}</td>
              <td>{scientist.species}</td>
              <td>{scientist.note}</td>
              <td>
                <Link to={`/edit/${scientist.id}`} className="btn btn-warning btn-sm mr-2">
                  Edit
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(scientist.id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScientistTable;
