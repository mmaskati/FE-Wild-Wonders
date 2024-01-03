import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerCluster from "./Clusters";
import { useState, useEffect } from 'react';
import Axios from 'axios';

import L from 'leaflet';

const Leaflet = () => {
    const [markers, setMarkers] = useState([]);
    const position = [26.25, 50.50];
    const mapStyle = { height: "80vh" };

    const fetchData = async () => {
        try {
            const response = await Axios.get("record/index");
            const newMarkers = response.data.records.map(record => {
                const position = {
                    lng: parseFloat(record.locationLongitude),
                    lat: parseFloat(record.locationLatitude),
                };

                const marker = L.marker(position);
                const popupContent = `
                    <div>
                        <img src="${record.image}" alt="Image" style="width: 145px;">
                        <p>${record.species.name}</p>
                    </div>
                `;
                marker.bindPopup(popupContent);

                return marker;
            });

            setMarkers(newMarkers);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures that this effect runs once after mount

    return (
        <>
            <MapContainer center={position} zoom={6} style={mapStyle} maxZoom={20}>
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <MarkerCluster markers={markers} />
            </MapContainer>
            <div>clearLayers and addLayers used. Look at the console to check performance</div>
        </>
    );
};

export default Leaflet;
