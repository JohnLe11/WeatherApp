import "./current.css";

const CurrentWeather = () => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">Belgrade</p>
          <p className="description">Sunny</p>
        </div>
        <img alt="weather" className="icon" src="icons/01d.png"></img>
      </div>
      <div className="bottom">
        <p className="temperature">18°C</p>
        <div className="details">
          <div className="row">
            <span className="label top">Details</span>
          </div>
          <div className="row">
            <span className="label">Feels Like</span>
            <span className="value">22°C</span>
          </div>
          <div className="row">
            <span className="label">Wind</span>
            <span className="value">2 m/s</span>
          </div>
          <div className="row">
            <span className="label">Humidity</span>
            <span className="value">15%</span>
          </div>
          <div className="row">
            <span className="label">Pressure</span>
            <span className="value">15 hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
