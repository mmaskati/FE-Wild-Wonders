import React, { useState } from "react";
// import AdvanceImage from "./AdvanceImage";

const ImageUpload = (props) => {
  // const [image, setImage] = useState(null);
  // const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
// console.log( process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", props.image);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      // props.setUrl(res.public_id);

      console.log("Original Image URL: " + res.secure_url);
      props.setUrl(res.secure_url);
      
      // console.log("Image Public Id =" + res.public_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setImage(file);

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onload = () => {
  //     setPreview(reader.result);
  //   };
  // };

  // const handleResetClick = () => {
  //   setPreview(null);
  //   setImage(null);
  // };

  return (
    <>
      <div className="mb-3">
      <label htmlFor="locationLongitude" className="form-label">{loading ? "Loading ... " : "Upload Image" } <code>(Must include Coordinates)</code></label>
        <div className="input-group mb-3">
        {/* <label htmlFor="imageP" className="input-group-text">{loading ? "Loading ... " : "Upload Image" }</label> */}
          <input type="file" name="imageP" id="imageP" className="form-control" accept="image/*" onChange={props.handleImageChange} required />
          {/* <label htmlFor="imageP" className="input-group-text" htmlFor="inputGroupFile02">Upload</label> */}
          <button onClick={uploadImage} className="btn btn-primary" disabled={!props.image}> Upload </button>
        </div>

                {/* <label htmlFor="imageP" className="form-label"> Upload Image:</label>
                <input type="file" name="imageP" id="imageP" className="form-control" accept="image/*" onChange={props.handleImageChange} required />
                <br/>
                <button onClick={uploadImage} className="btn btn-primary" disabled={!props.image}> Upload </button> */}
      </div>
      
        {/* <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center"> */}
        {/* <label className="form-label">Preview Image:</label> */}
        
          {/* <input
            id="hidden-input"
            type="file"
            className="form-label"
            onChange={handleImageChange}
            accept="image/*"
          /> */}
          {/* <label className="form-label">
            <div className="mb-3">
              Upload a file
            </div>
          </label> */}

          <div className="mb-3">
            {preview && <img src={preview} alt="preview" className="w-full" style={{width: 300, height:300}}/>}
          </div>
        <div>
         
          {/* <button
            onClick={handleResetClick}
            className="rounded-sm px-3 py-1 bg-red-700 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none"
          >
            Reset
          </button> */}
        </div>

        {/* {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
            <span>Uploading...</span>
          </div>
        ) : (
          props.url && (
            <div className="pb-8 pt-4">
              <AdvanceImage url={url} />
            </div>
          )
        )
        } */}
      
    </>
  );
};

export default ImageUpload;