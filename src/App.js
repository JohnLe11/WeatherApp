import { useState } from "react";
import "./App.css";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";
import CurrentWeather from "./components/currentWeather/current";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

// Main App component
function App() {
  // State to manage the visibility of the info section
  const [showInfo, setShowInfo] = useState(false);

  // Toggle function for the info section visibility
  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };

  // State to store the current weather data
  const [currentWeather, setCurrentWeather] = useState(null);

  // State to store the forecast data
  const [forecast, setForecast] = useState(null);

  // Function to handle the search input and fetch weather data
  const handleOnSearchChange = (searchData) => {
    // Extract latitude and longitude from the search data
    const [lat, lon] = searchData.value.split(" ");

    // Fetch current weather data based on the provided latitude and longitude
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    // Fetch forecast data based on the provided latitude and longitude
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    // Resolve both API calls and update the state with the fetched data
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json(); // Parse current weather data
        const forecastResponse = await response[1].json(); // Parse forecast data

        // Update state with the fetched current weather and forecast data
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err)); // Log any errors to the console
  };

  // Debugging logs to check the fetched data
  console.log(currentWeather);
  console.log(forecast);

  return (
    <div>
      <div className="App">
        {/* Header section with title and info button */}
        <header className="App-header">
          <h1>Weather Forecast App by John Le</h1>
          <button onClick={handleInfoClick} className="info-button">
            Info
          </button>
        </header>

        {/* Info section that toggles visibility */}
        {showInfo && (
          <div className="info-content">
            <p>
              The Product Manager Accelerator Program is designed to support PM
              professionals through every stage of their career. From students
              looking for entry-level jobs to Directors looking to take on a
              leadership role, our program has helped over hundreds of students
              fulfill their career aspirations.
              <br></br>
              <br></br>
              Our Product Manager Accelerator community are ambitious and
              committed. Through our program they have learnt, honed and
              developed new PM and leadership skills, giving them a strong
              foundation for their future endeavours.
              <br></br>
              <br></br>
              Learn product management for free today on our YouTube channel
              https://www.youtube.com/c/drnancyli?sub_confirmation=1
            </p>
            <a
              href="https://www.linkedin.com/school/productmanagerinterview/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more on LinkedIn
            </a>
          </div>
        )}
      </div>

      {/* Main container for search, current weather, and forecast components */}
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
