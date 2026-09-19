// Weather & Disease Outbreak Advisory Service

export const DISTRICT_PRESETS = {
  kozhikode: {
    name: "Kozhikode",
    lat: 11.2588,
    lng: 75.7804,
    temp: "27°C",
    humidity: "86%",
    blightRisk: "HIGH (88%)",
    blightColor: "#f87171",
    mildewRisk: "MODERATE (64%)",
    mildewColor: "#fbbf24",
    sprayWindow: "FAVORABLE TODAY",
    sprayColor: "#4ade80",
    icon: "🌧️",
    summary: "High Fungal Outbreak Warning: Extended leaf wetness > 6 hours predicted."
  },
  wayanad: {
    name: "Wayanad",
    lat: 11.6854,
    lng: 76.1320,
    temp: "24°C",
    humidity: "89%",
    blightRisk: "HIGH (92%)",
    blightColor: "#f87171",
    mildewRisk: "HIGH (76%)",
    mildewColor: "#f87171",
    sprayWindow: "WAIT FOR DRY WINDOW",
    sprayColor: "#fbbf24",
    icon: "🌧️",
    summary: "Severe Blight Risk: Highland mist and sustained moisture levels favor sporangia germination."
  },
  palakkad: {
    name: "Palakkad",
    lat: 10.7867,
    lng: 76.6548,
    temp: "30°C",
    humidity: "72%",
    blightRisk: "MODERATE (61%)",
    blightColor: "#fbbf24",
    mildewRisk: "LOW (38%)",
    mildewColor: "#4ade80",
    sprayWindow: "FAVORABLE TODAY",
    sprayColor: "#4ade80",
    icon: "⛅",
    summary: "Moderate Risk: Warm daytime winds; ideal conditions for early morning fungicide spraying."
  },
  idukki: {
    name: "Idukki",
    lat: 9.8500,
    lng: 76.9700,
    temp: "22°C",
    humidity: "91%",
    blightRisk: "HIGH (95%)",
    blightColor: "#f87171",
    mildewRisk: "HIGH (82%)",
    mildewColor: "#f87171",
    sprayWindow: "WAIT FOR DRY WINDOW",
    sprayColor: "#f87171",
    icon: "🌧️",
    summary: "Critical Outbreak Alert: Persistent rainfall and low temperatures promote Phytophthora spread."
  },
  kottayam: {
    name: "Kottayam",
    lat: 9.5916,
    lng: 76.5222,
    temp: "28°C",
    humidity: "81%",
    blightRisk: "HIGH (83%)",
    blightColor: "#f87171",
    mildewRisk: "MODERATE (59%)",
    mildewColor: "#fbbf24",
    sprayWindow: "FAVORABLE TOMORROW",
    sprayColor: "#4ade80",
    icon: "🌦️",
    summary: "Elevated Risk: Intermittent showers; monitor rubber, banana, and vegetable plots closely."
  },
  alappuzha: {
    name: "Alappuzha",
    lat: 9.4981,
    lng: 76.3388,
    temp: "29°C",
    humidity: "86%",
    blightRisk: "HIGH (89%)",
    blightColor: "#f87171",
    mildewRisk: "MODERATE (67%)",
    mildewColor: "#fbbf24",
    sprayWindow: "WAIT FOR DRY WINDOW",
    sprayColor: "#fbbf24",
    icon: "🌧️",
    summary: "Coastal High Moisture Warning: Paddy blast and sheath blight risks heightened."
  },
  thrissur: {
    name: "Thrissur",
    lat: 10.5276,
    lng: 76.2144,
    temp: "29°C",
    humidity: "78%",
    blightRisk: "MODERATE (72%)",
    blightColor: "#fbbf24",
    mildewRisk: "MODERATE (52%)",
    mildewColor: "#fbbf24",
    sprayWindow: "FAVORABLE TODAY",
    sprayColor: "#4ade80",
    icon: "⛅",
    summary: "Favorable Spray Day: High morning sunlight allows protective spray treatments to dry."
  }
};

export async function fetchLiveWeatherRisk(lat, lng) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&forecast_days=1`
    );
    if (!res.ok) throw new Error("Weather service response not ok");
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const humidity = Math.round(data.current.relative_humidity_2m);
    const rain = data.current.precipitation || 0;

    let level = "LOW RISK";
    let color = "#166534";
    let bg = "#dcfce7";
    let summary = `Current weather (${temp}°C, ${humidity}% humidity) is favorable for plant health.`;

    if (humidity > 80 && temp > 24) {
      level = "HIGH RISK";
      color = "#991b1b";
      bg = "#fee2e2";
      summary = `High humidity (${humidity}%) and warm temperature (${temp}°C) create prime conditions for Leaf Blight and Fungal outbreaks. Apply preventive fungicide!`;
    } else if (humidity > 65 || rain > 0) {
      level = "MODERATE RISK";
      color = "#92400e";
      bg = "#fef3c7";
      summary = `Moderate humidity (${humidity}%) detected. Monitor crops closely for early signs and avoid overhead watering.`;
    }

    return {
      temp: `${temp}°C`,
      humidity: `${humidity}%`,
      level,
      color,
      bg,
      summary
    };
  } catch (err) {
    console.warn("Live weather fetch failed:", err);
    return null;
  }
}
