import React, { useRef, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";


import { getCoordinates } from "./services/geocoding";
import { fetchRoute } from "./services/routing";
import { searchNearbyPlaces } from "./services/nearby";
import { parseVoiceCommand } from "./services/voice";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function App() {
  const mapRef = useRef(null);

  const [showDirections, setShowDirections] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [markerPos, setMarkerPos] = useState(null);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  
  const handleSearch = async (query = searchTerm) => {
    const cleanedQuery = query.trim();

    if (!cleanedQuery) {
      setStatusMessage("Enter a location");
      return;
    }

    setIsLoading(true);

    try {
      const coords = await getCoordinates(cleanedQuery);

      if (!coords) {
        setStatusMessage("Location not found");
        return;
      }

      setMarkerPos(coords);
      setRouteCoords([]);
      setNearbyPlaces([]);
      setStartCoords(null);
      setEndCoords(null);

      mapRef.current?.setView(coords, 14);

      setStatusMessage(`Showing: ${cleanedQuery}`);
    } catch {
      setStatusMessage("Search failed");
    } finally {
      setIsLoading(false);
    }
  };

  
  const getRoute = async (startText = start, endText = end) => {
    if (!startText || !endText) return;

    setIsLoading(true);

    try {
      const startCoord = await getCoordinates(startText);
      const endCoord = await getCoordinates(endText);

      if (!startCoord || !endCoord) return;

      setStartCoords(startCoord);
      setEndCoords(endCoord);
      setMarkerPos(null);

      const coords = await fetchRoute(startCoord, endCoord);
      setRouteCoords(coords);

      mapRef.current?.fitBounds(L.latLngBounds(coords));

      setStatusMessage("Route ready");
    } catch {
      setStatusMessage("Route error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNearby = async (placeType) => {
    if (!markerPos) {
      setStatusMessage("Search a location first");
      return;
    }

    setIsLoading(true);

    try {
      const [lat, lon] = markerPos;

      let results = await searchNearbyPlaces(lat, lon, placeType);

      if (results.length === 0) {
        setNearbyPlaces([]);
        return;
      }

      
      results.sort(
        (a, b) =>
          Math.hypot(a.lat - lat, a.lon - lon) -
          Math.hypot(b.lat - lat, b.lon - lon)
      );

      setNearbyPlaces(results);
      setRouteCoords([]);
      setStatusMessage("Click a marker");
    } catch {
      setStatusMessage("Nearby failed");
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleNearbyMarkerClick = async (place) => {
    if (!markerPos) return;

    setIsLoading(true);

    try {
      const found = [place.lat, place.lon];

      setStartCoords(markerPos);
      setEndCoords(found);
      setMarkerPos(null);

      const coords = await fetchRoute(markerPos, found);
      setRouteCoords(coords);

      mapRef.current?.fitBounds(L.latLngBounds(coords));

      setStatusMessage("Route to selected place");
    } catch {
      setStatusMessage("Route failed");
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleVoiceCommand = async (text) => {
    const command = parseVoiceCommand(text);

    if (command.intent === "search") {
      setSearchTerm(command.location);
      await handleSearch(command.location);
    }

    if (command.intent === "nearby") {
      await handleNearby(command.placeType);
    }

    if (command.intent === "directions") {
      setStart(command.start);
      setEnd(command.end);
      await getRoute(command.start, command.end);
    }
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.start();

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      handleVoiceCommand(text);
    };
  };

  return (
    <div>
      <h2>Safar Map</h2>

      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={() => handleSearch()}>Search</button>
      <button onClick={startVoiceRecognition}>🎤</button>

      <div>
        <button onClick={() => handleNearby("gas station")}>Gas</button>
        <button onClick={() => handleNearby("restaurant")}>Food</button>
        <button onClick={() => handleNearby("hospital")}>Hospital</button>
      </div>

      <p>{statusMessage}</p>

      <MapContainer
  center={[20, 0]}
  zoom={2}
  style={{ height: "80vh", width: "100%" }}
  ref={mapRef}
>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markerPos && <Marker position={markerPos} />}
        {startCoords && <Marker position={startCoords} />}
        {endCoords && <Marker position={endCoords} />}

        {nearbyPlaces.map((p, i) => (
          <Marker
            key={i}
            position={[p.lat, p.lon]}
            eventHandlers={{
              click: () => handleNearbyMarkerClick(p),
            }}
          />
        ))}

        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" />
        )}
      </MapContainer>
    </div>
  );
}

export default App;