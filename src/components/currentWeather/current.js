import "./current.css";

const CurrentWeather = ({data}) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="description">{data.weather[0].description}</p>
        </div>
        <img alt="weather" className="icon" src={`icons/${data.weather[0].icon}.png`}></img>
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°F</p>
        <div className="details">
          <div className="row">
            <span className="label top">Details</span>
          </div>
          <div className="row">
            <span className="label">Feels Like</span>
            <span className="value">{Math.round(data.main.feels_like)}°F</span>
          </div>
          <div className="row">
            <span className="label">Wind</span>
            <span className="value">{data.wind.speed} mph</span>
          </div>
          <div className="row">
            <span className="label">Humidity</span>
            <span className="value">{data.main.humidity}%</span>
          </div>
          <div className="row">
            <span className="label">Pressure</span>
            <span className="value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
