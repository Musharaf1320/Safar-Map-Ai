import axios from "axios";

const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;

export const fetchRoute = async (start, end) => {
  try {
    const res = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        coordinates: [start.slice().reverse(), end.slice().reverse()],
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.features[0].geometry.coordinates.map(([lng, lat]) => [
      lat,
      lng,
    ]);
  } catch (error) {
    console.error("Routing error:", error);
    return [];
  }
};