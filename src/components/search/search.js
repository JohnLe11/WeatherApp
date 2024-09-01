import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate"; // Import the AsyncPaginate component for asynchronous search
import { geoApiOptions, GEO_API_URL } from "../../api"; // Import API options and URL for fetching city data

// Search component for city search input
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null); // State to hold the selected city

  // Function to load options asynchronously based on user input
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json()) // Convert the response to JSON
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`, // Store the city's latitude and longitude as value
              label: `${city.name}, ${city.countryCode}`, // Display city name and country code as label
            };
          }),
        };
      });
  };

  // Handle change in search input
  const handleOnChange = (searchData) => {
    setSearch(searchData); // Update the search state with the selected city
    onSearchChange(searchData); // Trigger the onSearchChange callback with the selected city data
  };

  return (
    <AsyncPaginate
      placeholder="Search for city" // Placeholder text in the search input
      debounceTimeout={600} // Delay in milliseconds before the search is triggered
      value={search} // The current value of the search input
      onChange={handleOnChange} // Handler for when a city is selected
      loadOptions={loadOptions} // Function to load options asynchronously
    />
  );
};

export default Search; // Export the Search component for use in other parts of the app
