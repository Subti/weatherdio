export interface Location {
  latitude: number;
  longitude: number;
}

export const fetchWeatherData = async (location: Location) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok, try again later or check your API key');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
};