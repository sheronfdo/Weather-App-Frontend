import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherSearch = ({ onSearch, phase }) => {
  const [location, setLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [localPhase, setLocalPhase] = useState(phase); // Local state to track phase

  // Update localPhase when phase prop changes
  useEffect(() => {
    setLocalPhase(phase);
  }, [phase]);

  // Fetch search suggestions from backend
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get('http://localhost:3000/api/search', {
        params: { q: query }
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  // Debounce search input to avoid excessive API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (location) {
        fetchSuggestions(location);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [location]);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    const selectedLocation = suggestion.url;
    setLocation(selectedLocation);
    setShowSuggestions(false);
    if (onSearch) onSearch(selectedLocation);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim() && onSearch) onSearch(location);
    setShowSuggestions(false);
  };

  const isLightPhase = localPhase === 'day' || localPhase === 'sunrise' || localPhase === 'sunset';

    return (
    <div className="z-20 w-full">
      <form onSubmit={handleSearch} className="relative flex">
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Enter location (e.g., London, New York)"
          className={`p-3 rounded-l-lg bg-white bg-opacity-20 text-black border border-gray-600 backdrop-filter blur(10px) focus:outline-none focus:border-gray-400 w-full`}
        />
        <button
          type="submit"
          className={`p-3 bg-gray-500 text-white rounded-r-lg hover:${isLightPhase ? 'bg-gray-800' : 'bg-gray-600'} transition-colors`}
        >
          Search
        </button>
        {showSuggestions && suggestions.length > 0 && (
          <ul className={`absolute top-full left-0 w-full mt-1 bg-white bg-opacity-20 border border-gray-600 backdrop-filter blur(10px) rounded-lg shadow-lg z-30`}>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                className={`p-2 hover:bg-gray-700 bg-opacity-20 text-black cursor-pointer`}
              >
                {suggestion.name}, {suggestion.region}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default WeatherSearch;