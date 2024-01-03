import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerCluster from "./Clusters";
import { useState, useEffect } from 'react';
import Axios from 'axios';

const Leaflet = () => {
    const [markers, setMarkers] = useState([]);
    const position = [26.25, 50.50];
    const mapStyle = { height: "80vh" };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get("record/index");
                const newMarkers = response.data.records.map(record => ({
                    position: {
                        lng: parseFloat(record.locationLongitude),
                        lat: parseFloat(record.locationLatitude),
                    },
                }));
                setMarkers(newMarkers);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

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



