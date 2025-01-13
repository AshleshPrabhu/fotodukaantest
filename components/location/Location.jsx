"use client";

import React, { useState, useEffect } from "react";

export default function Location({ onSelectLocation }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility

  useEffect(() => {
    if (input === "") {
      setSuggestions(["Delhi", "Bangalore", "Mumbai", "Pune", "Patna"]);
    }
  }, [input]);

  const fetchSuggestions = async (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/autocomplete?input=${encodeURIComponent(value)}`);
      if (!response.ok) throw new Error("Failed to fetch suggestions");
      const data = await response.json();
      const cities = data.predictions.map((prediction) => prediction.split(",")[0]);
      setSuggestions(cities);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    fetchSuggestions(value);
  };

  const handleSelect = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    setShowDropdown(false); // Hide dropdown
    onSelectLocation(suggestion); // Notify parent component
  };

  const handleFocus = () => {
    setShowDropdown(true); // Show dropdown on input focus
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200); // Delay hiding to allow click selection
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Location"
          className="w-full px-4 py-2  rounded-lg  focus:outline-none placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {loading && (
            <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
          )}
          {!loading &&
            suggestions.slice(0, 5).map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelect(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {suggestion}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
