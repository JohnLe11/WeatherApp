# Weather Forecast App

## Description
The Weather Forecast App is a React-based application that provides real-time weather data and a 5-day forecast for any city worldwide. It uses the GeoDB API to fetch city data and the OpenWeatherMap API to retrieve weather information. The app features a clean and intuitive interface, making it easy for users to search for cities and view detailed weather forecasts.

## Features
- City Search: Users can search for cities using an asynchronous search bar with debouncing to optimize API calls.
- Current Weather: Displays the current temperature, weather description, and an icon representing the weather conditions.
- 5-Day Forecast: Provides a detailed 5-day weather forecast, including max/min temperatures, pressure, humidity, cloud cover, and wind speed.
- Responsive Design: The app is fully responsive and works well on desktop and mobile devices.
- Info Section: Includes additional information about the Product Manager Accelerator Program, which can be toggled on or off.

## Technologies Used
- React: This is used to build the user interface.
- GeoDB API: For fetching city data based on user input.
- OpenWeatherMap API: For retrieving current weather and forecast data.
- React-Select-Async-Paginate: For implementing asynchronous city search with debouncing.
- CSS: For styling the application, ensuring a modern and responsive design.

## Installation

1. Clone the repository:
[git clone https://github.com/JohnLe11/WeatherApp.git[

3. Navigate to the project directory:
[cd WeatherApp]

5. Install dependencies:
[npm install react-scripts]

7. Run:
[npm start]

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How it works

### City Search
The app allows users to search for cities by name. The Search component handles the input and makes asynchronous requests to the GeoDB API to fetch matching cities. The city data is then displayed as options in the dropdown.

### Current Weather
When a user selects a city, the app fetches the current weather data from the OpenWeatherMap API. This data is displayed in the CurrentWeather component, which shows the temperature, weather description, and an appropriate weather icon.

### 5-Day Forecast
The app also fetches a 5-day weather forecast for the selected city. The forecast data is processed to group weather conditions by day, and the Forecast component displays this data in an accordion format. Each day’s forecast includes max/min temperatures and other details like pressure, humidity, and wind speed.

## Contact
For any questions or feedback, please feel free to contact me at johnle2046@gmail.com.
