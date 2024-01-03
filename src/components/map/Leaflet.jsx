import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerCluster from "./Clusters";
import { useState, useEffect } from 'react';
import Axios from 'axios';

const Leaflet = () => {

// useEffect(() => {

//     addMarkers();

// }, []);

// const [records, setRecord] = useState([]);

// const loadRecordList = () => {
// Axios.get("record/index", )
// .then((response) => {
// // console.log(response);
// setRecord(response.data.records);
// })
// .catch((error) => {
// console.log(error);
// })
// };

let markers, markers2;

const position = [26.25, 50.50]; //default 51.505, -0.09
const mapStyle = { height: "80vh" };

const addMarkers = async () => {
markers = [];
markers2 = [];

Axios.get("record/index", )
.then((response) => {
// console.log(response);
// setRecord(response.data.records);

for (let i = 0; i < 4; i++) {

markers.push({
    position: { 
        // lng: parseFloat(response.data.records[i].locationLongitude),
        // lat: parseFloat(response.data.records[i].locationLatitude),
        lng: -122.673447 + Math.random() * 200.0,
        lat: 45.5225581 - 60 + Math.random() * 80
}
});
}

})
.catch((error) => {
console.log(error);
})

//////////////////////////////////////////////////
for (let i = 0; i < 4; i++) {
    markers2.push({
    position: {
        lng: -122.673447 + Math.random() * 200.0,
        lat: 45.5225581 - 60 + Math.random() * 80
    }
    });
}
//////////////////////////////////////////////////


};

addMarkers();

console.log( markers);

console.log( markers2);

return (
<>
    <MapContainer center={position} zoom={6} style={mapStyle} maxZoom={20}>
    <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <MarkerCluster markers={markers} addMarkers={addMarkers} />
    </MapContainer>
    <div>
    clearLayers and addLayers used. Look at the console to check performance
    </div>
</>
);
};

export default Leaflet;