import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../css/LeafletMap.css';

interface LeafletMapProps {
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

const LeafletMap: React.FC<LeafletMapProps> = ({ latitude, longitude }) => {
  const [location, setLocation] = useState({ latitude, longitude });

  useEffect(() => {
    setLocation({ latitude, longitude });
  }, [latitude, longitude]);

  const LocationMarker = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([latitude, longitude], map.getZoom());
    }, [latitude, longitude, map]);

    return location.latitude !== 0 && location.longitude !== 0 ? (
      <Marker position={[location.latitude, location.longitude]} />
    ) : null;
  };

  return (
    <>
      <h1>
        Latitude: {parseFloat(location.latitude.toFixed(2))}, Longitude: {parseFloat(location.longitude.toFixed(2))}
      </h1>
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
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  );
};

export default LeafletMap;