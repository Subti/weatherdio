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

  return (
    <div>
      <h1>Location App</h1>
      <LocationComponent setLocation={setLocation} />
      {location && <LeafletMap latitude={location.latitude} longitude={location.longitude} />}
    </div>
  );
};

export default App;