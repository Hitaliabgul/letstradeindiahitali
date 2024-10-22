import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const LocationMap = ({ pincode }) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '400px',
    latitude: 20.5937, // Default latitude for India
    longitude: 78.9629, // Default longitude for India
    zoom: 5, // Default zoom level
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Fetch location data based on the pincode using an API or other methods
    // Replace the placeholder API_URL with the actual API endpoint
    fetch(`API_URL/${pincode}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract the latitude and longitude from the location data
        const { latitude, longitude } = data;

        // Update the viewport and location state with the retrieved coordinates
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude,
          longitude,
        }));
        setLocation({ latitude, longitude });
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  }, [pincode]);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(newViewport) => setViewport(newViewport)}
      mapStyle="mapbox://styles/mapbox/streets-v11" // Replace with desired map style
    >
      {location && (
        <Marker
          latitude={location.latitude}
          longitude={location.longitude}
          offsetLeft={-20}
          offsetTop={-40}
        >
          <div className="text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </Marker>
      )}
    </ReactMapGL>
  );
};

export default LocationMap;
