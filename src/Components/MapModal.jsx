import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { X } from "lucide-react";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const GEOCODING_API_KEY = "b9f9ae186e0b47e390c116be65d1beaf";

function MapModal({ address, city, state, country, onClose }) {
  const [coordinates, setCoordinates] = useState(undefined);
  const fullAddress = `${address}, ${city}, ${state}, ${country}`;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          "https://api.opencagedata.com/geocode/v1/json",
          {
            params: {
              q: fullAddress,
              key: GEOCODING_API_KEY,
            },
          }
        );

        console.log(response);

        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry;
          setCoordinates({ latitude: lat, longitude: lng });
        } else {
          setCoordinates(null);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setCoordinates(null);
      }
    };

    fetchCoordinates();
  }, [fullAddress]);

  return (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-200 h-150  mx-4 relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-center mb-4">Map Location</h2>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300"
          >
            <X />
          </button>
        </div>
        {coordinates === undefined ? (
          <p className="text-center">Loading map...</p>
        ) : coordinates === null ? (
          <p className="text-center text-red-500">
            No map available for this address.
          </p>
        ) : (
          <MapContainer
            center={[coordinates.latitude, coordinates.longitude]}
            zoom={15}
            style={{ width: "100%", height: "500px" }}
            className="rounded-lg overflow-hidden"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <Marker position={[coordinates.latitude, coordinates.longitude]}>
              <Popup>{fullAddress}</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
}

export default MapModal;
