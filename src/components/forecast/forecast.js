import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  // Group data by day
  const dailyData = [];
  data.list.forEach((item) => {
    const date = new Date(item.dt_txt).getDate();
    const existingDay = dailyData.find((day) => day.date === date);

    if (existingDay) {
      existingDay.temp_max = Math.max(existingDay.temp_max, item.main.temp_max);
      existingDay.temp_min = Math.min(existingDay.temp_min, item.main.temp_min);

      // Accumulate other details (taking averages or sums as needed)
      existingDay.pressure += item.main.pressure;
      existingDay.humidity += item.main.humidity;
      existingDay.clouds += item.clouds.all;
      existingDay.wind_speed += item.wind.speed;

      existingDay.entriesCount += 1;
      existingDay.weather.push(item.weather[0]);
    } else {
      dailyData.push({
        date,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        clouds: item.clouds.all,
        wind_speed: item.wind.speed,
        entriesCount: 1,
        weather: [item.weather[0]],
      });
    }
  });

  // Extract one weather condition per day (e.g., the most frequent one)
  dailyData.forEach((day) => {
    const weatherCount = {};
    day.weather.forEach((condition) => {
      const main = condition.main;
      if (!weatherCount[main]) weatherCount[main] = 0;
      weatherCount[main]++;
    });
    day.mainWeather = Object.keys(weatherCount).reduce((a, b) =>
      weatherCount[a] > weatherCount[b] ? a : b
    );
    day.icon = day.weather.find((w) => w.main === day.mainWeather).icon;
    day.description = day.weather.find(
      (w) => w.main === day.mainWeather
    ).description;

    // Calculate the average for accumulated values
    day.pressure = Math.round(day.pressure / day.entriesCount);
    day.humidity = Math.round(day.humidity / day.entriesCount);
    day.clouds = Math.round(day.clouds / day.entriesCount);
    day.wind_speed = (day.wind_speed / day.entriesCount).toFixed(1);
  });

  return (
    <>
      <label className="title">5-Day Forecast</label>
      <Accordion allowZeroExpanded>
        {dailyData.slice(0, 5).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="dailyItem">
                  <img
                    src={`icons/${item.icon}.png`}
                    className="iconSmall"
                    alt="weather"
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.description}</label>
                  <label className="minMax">
                    {Math.round(item.temp_max)}°F / {Math.round(item.temp_min)}
                    °F
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="detailsGrid">
                <div className="detailsGridItem">
                  <label>Pressure:</label>
                  <label>{item.pressure} hPa</label>
                </div>
                <div className="detailsGridItem">
                  <label>Humidity:</label>
                  <label>{item.humidity}%</label>
                </div>
                <div className="detailsGridItem">
                  <label>Clouds:</label>
                  <label>{item.clouds}%</label>
                </div>
                <div className="detailsGridItem">
                  <label>Wind speed:</label>
                  <label>{item.wind_speed} mph</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
