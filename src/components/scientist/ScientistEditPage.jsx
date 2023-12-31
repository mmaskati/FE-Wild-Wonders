import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const ScientistEditPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Scientist Edit Page</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

    
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Note:
          </label>
          <textarea
            className="form-control"
            id="note"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="4"
          ></textarea>
        </div>

        <button
          type="button"
          className="btn btn-warning"
        >
          Update User Information
        </button>
      </form>
    </div>
  );
};

export default ScientistEditPage;
