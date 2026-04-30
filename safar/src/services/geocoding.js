import axios from "axios";

export const getCoordinates = async (address) => {
  if (!address?.trim()) return null;

  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
    });

    if (res.data?.length > 0) {
      return [parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)];
    }

    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};