const OPEN_METEO_URL = "https://archive-api.open-meteo.com/v1/archive";

export const locations = [
  { name: "New York, USA", lat: 40.7128, lon: -74.006 },
  { name: "London, UK", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo, Japan", lat: 35.6762, lon: 139.6503 },
  { name: "Sydney, Australia", lat: -33.8688, lon: 151.2093 },
  { name: "Mumbai, India", lat: 19.076, lon: 72.8777 },
  { name: "São Paulo, Brazil", lat: -23.5505, lon: -46.6333 },
];

export const getLocationCoords = (locationName: string) => {
  return locations.find((loc) => loc.name === locationName);
};

export const fetchDailyWeather = async (
  lat: number,
  lon: number,
  startDate: string,
  endDate: string
) => {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    start_date: startDate,
    end_date: endDate,
    daily:
      "temperature_2m_mean,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max",
    timezone: "auto",
  });

  try {
    const response = await fetch(`${OPEN_METEO_URL}?${params}`);
    return await response.json();
  } catch (error) {
    console.error("hererere error cameeee", error);
    throw error;
  }
};

export const fetchHourlyWeather = async (
  lat: number,
  lon: number,
  startDate: string,
  endDate: string
) => {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    start_date: startDate,
    end_date: endDate,
    hourly:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,pressure_msl,wind_speed_10m,wind_speed_100m",
    timezone: "auto",
  });

  try {
    const response = await fetch(`${OPEN_METEO_URL}?${params}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching hourly weather:", error);
    throw error;
  }
};
