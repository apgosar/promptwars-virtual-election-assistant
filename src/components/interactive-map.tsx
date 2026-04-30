"use client";

import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

type Location = {
  name: string;
  lat: number;
  lng: number;
  address: string;
};

const defaultLocations: Location[] = [
  { name: "BMC Office Ward A", lat: 18.9322, lng: 72.8344, address: "Shahid Bhagat Singh Road, Fort, Mumbai" },
  { name: "Public School Election Center", lat: 18.9389, lng: 72.835, address: "CSMT Area, Mumbai" },
  { name: "Community Hall Polling Station", lat: 18.945, lng: 72.832, address: "Marine Lines, Mumbai" },
];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
};

const center = {
  lat: 18.9322,
  lng: 72.8344,
};

export function InteractiveMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [activeMarker, setActiveMarker] = React.useState<Location | null>(null);

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
    }),
    []
  );

  if (loadError) {
    return (
      <div className="map-preview" style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        Error loading Google Maps. Please check your API Key.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="map-preview" style={{ padding: "2rem", textAlign: "center" }}>
        Loading interactive map...
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }} role="region" aria-label="Interactive polling location map">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={14} center={center} options={options}>
        {defaultLocations.map((loc) => (
          <Marker
            key={loc.name}
            position={{ lat: loc.lat, lng: loc.lng }}
            onClick={() => setActiveMarker(loc)}
            title={loc.name}
          />
        ))}

        {activeMarker && (
          <InfoWindow
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div style={{ color: "#000", padding: "0.25rem" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem", margin: 0 }}>{activeMarker.name}</h3>
              <p style={{ margin: 0, fontSize: "0.875rem" }}>{activeMarker.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
