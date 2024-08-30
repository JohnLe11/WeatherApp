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


export const geoApiOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'b3a3740025msh5103337e3b4b5b0p167adcjsn99188e9dc04a',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

