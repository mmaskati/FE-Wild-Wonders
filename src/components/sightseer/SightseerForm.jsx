
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
    <div className="container py-5 mb-5">
  
      <p>Have you seen a whale or a dolphin? Report your sighting and help the local research!
         View all the sightings reported from the public in the Sighting map!</p>
         <br/>
         <br/>
         <br/>
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit} className="col-md">
          <div className="row">

            <div className="col-md-6">


            <div className="mb-3">
                <label htmlFor="species" className="form-label">
                  Species:
                </label>
                <select
                  className="form-control"
                  id="species"
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                > 
                  <option value="">Select Species</option>
                  <option value="Species1">Species 1</option>
                  <option value="Species2">Species 2</option>
                </select>
              </div>

              <div className="mb-3">
                <label  className="form-label">
                  Location :
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="latitude"
                  name="latitude"
                  value={formData.location.latitude}
                  onChange={handleLocationChange}
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
              <div className="mb-3">
                <label htmlFor="numberOfAnimals" className="form-label">
                  Approximate Number of Animals:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfAnimals"
                  name="numberOfAnimals"
                  value= "1"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>

            

            {/* Image Section */}
            <div className="col-md-6">
      <div className='row g-3'>
      <div class="col-sm-6">
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
            <div class="col-sm-6">
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
              </div>

        

    
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
                <label className="form-label">Preview Image:</label>
                <div className="imagesized" >
                {formData.image && (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="img-fluid"
                    style={{ width: 629, height: 345 }}
                  />
                )}
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SightseerForm;
