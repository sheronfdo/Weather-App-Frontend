import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherSearch = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

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
    const selectedLocation = suggestion.name;
    setLocation(selectedLocation);
    setShowSuggestions(false);
    if (onSearch) onSearch(selectedLocation);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim() && onSearch) onSearch(location);
    setShowSuggestions(false);
  };

  return (
    <div className="fixed top-4 left-4 z-20 w-full max-w-md">
      <form onSubmit={handleSearch} className="relative flex">
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Enter location (e.g., London, New York)"
          className="p-3 rounded-l-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500 w-full"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-30">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                className="p-2 hover:bg-gray-700 cursor-pointer text-white"
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