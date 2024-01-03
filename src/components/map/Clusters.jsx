import { useEffect } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useMap } from "react-leaflet";

const markerClusters = L.markerClusterGroup();
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41]
});

const MarkerCluster = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    console.log("Received markers:", markers);

    // Check if markers array is not empty
    if (markers.length > 0) {
      markerClusters.clearLayers();
      markers.forEach(({ marker, position }) => {
        // Check if marker is defined before attempting to add it
        if (marker) {
          marker.setLatLng(new L.LatLng(position.lat, position.lng));
          marker.addTo(markerClusters);
        }
      });

      map.addLayer(markerClusters);
    }
  }, [markers, map]);

  return null;
};

export default MarkerCluster;
