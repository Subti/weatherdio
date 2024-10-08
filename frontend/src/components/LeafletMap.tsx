import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../css/LeafletMap.css';

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  setLocation: (location: Location) => void; // Add setLocation prop
}

interface Location {
  latitude: number;
  longitude: number;
}

// Fix for default marker icon issue with Leaflet
const DefaultIcon = L.Icon.Default as any;
delete DefaultIcon.prototype._getIconUrl;
DefaultIcon.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationMarker: React.FC<{ location: Location; setLocation: (location: Location) => void }> = ({ location, setLocation }) => {
  const map = useMapEvents({
    click(e) {
      setLocation({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
      map.setView(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.setView([location.latitude, location.longitude], map.getZoom());
    map.invalidateSize(); // Ensure the map is properly rendered
  }, [location.latitude, location.longitude, map]);

  return location.latitude !== 0 && location.longitude !== 0 ? (
    <Marker position={[location.latitude, location.longitude]} />
  ) : null;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ latitude, longitude, setLocation }) => { // Accept setLocation as a prop
  const [location, setLocalLocation] = useState<Location>({ latitude, longitude });

  useEffect(() => {
    setLocalLocation({ latitude, longitude });
  }, [latitude, longitude]);

  return (
    <>
      <div className="map-wrapper">
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={16}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker location={location} setLocation={(loc) => { // Update both local and parent location
            setLocalLocation(loc);
            setLocation(loc);
          }} />
        </MapContainer>
      </div>
    </>
  );
};

export default LeafletMap;