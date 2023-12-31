// import React from 'react';
// import { MapContainer } from "leaflet";
// import { TileLayer } from "leaflet";
// // import { useMap } from 'leaflet';
// import { Popup, Marker } from "leaflet";

// export default function Map(props) {

// const theMap = () => {

//     let L = {};
//     var map = L.map('map').setView([26.059851, 50.541423], 10);
  
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);
    
//     L.marker([26.03052995190339, 50.77470491757943]).addTo(map)
//         .bindPopup('<a href="#">Whale 1</a><br><img src="humpback.jpg" width="165px">');
        
//     L.marker([25.995769583556033, 50.288802674373635]).addTo(map)
//     .bindPopup('<a href="#">Whale 2</a><br><img src="download.jpeg" width="165px"><br><br>This is really cool');

//     return L.map;
// }

// const position = [51.505, -0.09];

//   return (
// <>
// <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
//     <TileLayer
//       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//     <Marker position={position}>
//       <Popup>
//         A pretty CSS3 popup. <br /> Easily customizable.
//       </Popup>
//     </Marker>
//   </MapContainer>



//     {/* <div id="map" className="theMap"></div> */}


// </>
//   )
// }
