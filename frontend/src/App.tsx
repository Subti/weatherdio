import './App.css';
import React, { useEffect, useState } from 'react';
import LocationComponent from './components/LocationComponent';
import LeafletMap from './components/LeafletMap';
import { fetchWeatherData } from './helpers/weatherHelper';

interface Location {
  latitude: number;
  longitude: number;
}

const App: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [mapEnabled, setMapEnabled] = useState(false);
  const [weatherData, setWeatherData] = useState<any | null>(null);

  useEffect(() => {
    const updateWeatherData = async () => {
      if (location) {
        try {
          const data = await fetchWeatherData(location);
          setWeatherData(data);
        } catch (error) {
          console.error('Error updating weather data:', error);
        }
      }
    };

    updateWeatherData();
  }, [location]);

  const clearLocation = () => {
    setLocation(null);
    setWeatherData(null); // Optionally clear weather data as well
  };

  return (
    <div>
      <h1>Location App</h1>
      <button className="map-display-button" onClick={() => setMapEnabled(!mapEnabled)}>{mapEnabled ? 'Hide Map' : 'Show Map'}</button>
      <LocationComponent setLocation={setLocation} />
      {weatherData && (
        <div>
          <h2>Weather Data</h2>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C | {((((weatherData.main.temp - 273.15) * 9) / 5) + 32).toFixed(2)}°F</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
      <h1>
        Latitude: {location ? parseFloat(location.latitude.toFixed(2)) : '--'}, Longitude: {location ? parseFloat(location.longitude.toFixed(2)) : '--'}
      </h1>
      <button className="clear-location-button" onClick={clearLocation}>Clear Location</button>
      {location && mapEnabled && < LeafletMap latitude={location.latitude} longitude={location.longitude} setLocation={setLocation} />}
    </div>
  );
};

export default App;