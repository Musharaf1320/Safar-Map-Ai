export const parseVoiceCommand = (text) => {
  const lower = text.toLowerCase().trim();

  if (lower.startsWith("take me to")) {
    return {
      intent: "search",
      location: lower.replace("take me to", "").trim(),
    };
  }

  if (lower.startsWith("get directions from")) {
    const cleaned = lower.replace("get directions from", "").trim();
    const parts = cleaned.split(" to ");

    if (parts.length === 2) {
      return {
        intent: "directions",
        start: parts[0].trim(),
        end: parts[1].trim(),
      };
    }
  }

  if (lower.includes("gas station")) {
    return { intent: "nearby", placeType: "gas station" };
  }

  if (lower.includes("restaurant")) {
    return { intent: "nearby", placeType: "restaurant" };
  }

  if (lower.includes("hospital")) {
    return { intent: "nearby", placeType: "hospital" };
  }

  return { intent: "search", location: text };
};