import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"; // Import accordion components from the accessible accordion library
import "./forecast.css"; // Import CSS file for styling the forecast component

// Array of week days to map forecast data to days of the week
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
  const dayInAWeek = new Date().getDay(); // Get the current day of the week (0 for Sunday, 1 for Monday, etc.)
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  ); // Reorder the week days array so that it starts with the current day

  // Group data by day to accumulate and process daily forecast information
  const dailyData = [];
  data.list.forEach((item) => {
    const date = new Date(item.dt_txt).getDate(); // Extract the date from the forecast item
    const existingDay = dailyData.find((day) => day.date === date); // Check if data for this date already exists

    if (existingDay) {
      // Update the existing day's data
      existingDay.temp_max = Math.max(existingDay.temp_max, item.main.temp_max);
      existingDay.temp_min = Math.min(existingDay.temp_min, item.main.temp_min);

      // Accumulate other details (taking averages or sums as needed)
      existingDay.pressure += item.main.pressure;
      existingDay.humidity += item.main.humidity;
      existingDay.clouds += item.clouds.all;
      existingDay.wind_speed += item.wind.speed;

      existingDay.entriesCount += 1; // Increment the count of entries for this day
      existingDay.weather.push(item.weather[0]); // Store the weather conditions for this entry
    } else {
      // Create a new day entry with initial data
      dailyData.push({
        date,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        clouds: item.clouds.all,
        wind_speed: item.wind.speed,
        entriesCount: 1, // Start the count of entries for this day
        weather: [item.weather[0]], // Store the weather condition for this entry
      });
    }
  });

  // Extract one weather condition per day (e.g., the most frequent one)
  dailyData.forEach((day) => {
    const weatherCount = {}; // Object to count occurrences of each weather condition
    day.weather.forEach((condition) => {
      const main = condition.main;
      if (!weatherCount[main]) weatherCount[main] = 0;
      weatherCount[main]++;
    });

    // Determine the most frequent weather condition for the day
    day.mainWeather = Object.keys(weatherCount).reduce((a, b) =>
      weatherCount[a] > weatherCount[b] ? a : b
    );

    // Get the corresponding icon and description for the main weather condition
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
      <label className="title">5-Day Forecast</label>{" "}
      {/* Title for the forecast section */}
      <Accordion allowZeroExpanded>
        {dailyData.slice(0, 5).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="dailyItem">
                  <img
                    src={`icons/${item.icon}.png`}
                    className="iconSmall"
                    alt="weather" /* Weather icon */
                  />
                  <label className="day">{forecastDays[idx]}</label>{" "}
                  {/* Day of the week */}
                  <label className="description">{item.description}</label>{" "}
                  {/* Weather description */}
                  <label className="minMax">
                    {Math.round(item.temp_max)}°F / {Math.round(item.temp_min)}
                    °F {/* Max and min temperatures */}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="detailsGrid">
                <div className="detailsGridItem">
                  <label>Pressure:</label>
                  <label>{item.pressure} hPa</label>{" "}
                  {/* Atmospheric pressure */}
                </div>
                <div className="detailsGridItem">
                  <label>Humidity:</label>
                  <label>{item.humidity}%</label> {/* Humidity level */}
                </div>
                <div className="detailsGridItem">
                  <label>Clouds:</label>
                  <label>{item.clouds}%</label> {/* Cloudiness percentage */}
                </div>
                <div className="detailsGridItem">
                  <label>Wind speed:</label>
                  <label>{item.wind_speed} mph</label> {/* Wind speed */}
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast; // Export the Forecast component for use in other parts of the app
