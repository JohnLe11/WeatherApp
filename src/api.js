// const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'b3a3740025msh5103337e3b4b5b0p167adcjsn99188e9dc04a',
// 		'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

// Configuration object for GeoDB API requests
export const geoApiOptions = {
  method: "GET", // Specifies that the request will be a GET request
  headers: {
    "x-rapidapi-key": "b3a3740025msh5103337e3b4b5b0p167adcjsn99188e9dc04a", // API key for accessing the GeoDB API
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com", // Host URL for the GeoDB API
  },
};

// Base URL for the GeoDB API
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// Base URL for the OpenWeatherMap API
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

// API key for accessing the OpenWeatherMap API
export const WEATHER_API_KEY = "da948d36fefb2a3afebcd57bda74e8e0";
