import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

interface Location {
  latitude: number;
  longitude: number;
}

interface OptionType {
  label: string;
  value: Location;
}

interface LocationComponentProps {
  setLocation: (location: Location) => void;
}

const LocationComponent: React.FC<LocationComponentProps> = ({ setLocation }) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting client location:', error);
        }
      );
    }
  }, [setLocation]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.length > 2) {
      fetchLocationSuggestions(value);
    }
  };

  const fetchLocationSuggestions = async (query: string) => {
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: query,
          key: import.meta.env.VITE_OPEN_CAGE_KEY, // Access the environment variable
        },
      });
      const suggestions = response.data.results.map((result: any) => ({
        label: result.formatted,
        value: {
          latitude: result.geometry.lat,
          longitude: result.geometry.lng,
        },
      }));
      setOptions(suggestions);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setLocation(selectedOption.value);
    }
  };

  return (
    <div>
      <Select
        value={null}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        inputValue={inputValue}
        placeholder="Enter a location"
      />
    </div>
  );
};

export default LocationComponent;