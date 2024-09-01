import "./current.css"; // Import the CSS file for styling the current weather component

// Functional component to display the current weather data
const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      {/* Top section containing the city name, weather description, and icon */}
      <div className="top">
        <div>
          <p className="city">{data.city}</p> {/* Display the city name */}
          <p className="description">{data.weather[0].description}</p>{" "}
          {/* Display the weather description */}
        </div>
        <img
          alt="weather"
          className="icon"
          src={`icons/${data.weather[0].icon}.png`}
        ></img>{" "}
        {/* Display the weather icon */}
      </div>

      {/* Bottom section containing the temperature and additional weather details */}
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°F</p>{" "}
        {/* Display the current temperature */}
        <div className="details">
          {/* Row for the "Details" label */}
          <div className="row">
            <span className="label top">Details</span>
          </div>

          {/* Row displaying "Feels Like" temperature */}
          <div className="row">
            <span className="label">Feels Like</span>
            <span className="value">{Math.round(data.main.feels_like)}°F</span>
          </div>

          {/* Row displaying wind speed */}
          <div className="row">
            <span className="label">Wind</span>
            <span className="value">{data.wind.speed} mph</span>
          </div>

          {/* Row displaying humidity level */}
          <div className="row">
            <span className="label">Humidity</span>
            <span className="value">{data.main.humidity}%</span>
          </div>

          {/* Row displaying atmospheric pressure */}
          <div className="row">
            <span className="label">Pressure</span>
            <span className="value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather; // Export the CurrentWeather component for use in other parts of the application
