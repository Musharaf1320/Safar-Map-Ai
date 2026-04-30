import axios from "axios";

export const searchNearbyPlaces = async (lat, lon, placeType) => {
  const radius = 0.02;

  const res = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: placeType,
      format: "json",
      limit: 5,
      bounded: 1,
      viewbox: `${lon - radius},${lat + radius},${lon + radius},${lat - radius}`,
    },
    headers: {
      Accept: "application/json",
    },
  });

  return res.data || [];
};