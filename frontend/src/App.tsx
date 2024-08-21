import './App.css';
import React, { useState } from 'react';
import LocationComponent from './components/LocationComponent';
import LeafletMap from './components/LeafletMap';

interface Location {
  latitude: number;
  longitude: number;
}

const App: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [mapEnabled, setMapEnabled] = useState(false);

  return (
    <div>
      <h1>Location App</h1>
      <button className="map-display-button" onClick={() => setMapEnabled(!mapEnabled)}>{mapEnabled ? 'Hide Map' : 'Show Map'}</button>
      <LocationComponent setLocation={setLocation} />
      {location && mapEnabled && < LeafletMap latitude={location.latitude} longitude={location.longitude} />}
    </div>
  );
};

export default App;