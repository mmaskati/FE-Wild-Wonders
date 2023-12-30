import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SightseerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateTime: '',
    location: { latitude: '', longitude: '' },
    species: '',
    note: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
<>
<div className="container mt-5">

      <div className="row g-5">
        <form onSubmit={handleSubmit} className="col-md-6">
          {/* Form Fields */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dateTime" className="form-label">
              Time/Date:
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="latitude" className="form-label">
              Location (Latitude):
            </label>
            <input
              type="text"
              className="form-control"
              id="latitude"
              name="latitude"
              value={formData.location.latitude}
              onChange={handleLocationChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="longitude" className="form-label">
              Location (Longitude):
            </label>
            <input
              type="text"
              className="form-control"
              id="longitude"
              name="longitude"
              value={formData.location.longitude}
              onChange={handleLocationChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="species" className="form-label">
              Species:
            </label>
            <input
              type="text"
              className="form-control"
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
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
              value={formData.note}
              onChange={handleChange}
            ></textarea>
          </div>
       

        {/* Image and Submit Button */}
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image:
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="image">Preview Image:</label>
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="img-fluid"
              />
            )}
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div></form>
      </div>
      
</div> 
</>
  );
};

export default SightseerForm;
