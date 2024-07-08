export const baseurl = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1';

export const matchurl = 'https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1';

export const imageurl = 'https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1';

export const playerurl = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player';

export const playersearchurl = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search?plrN=';

export const rankingurl = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings';

export const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPI_KEY,
		'X-RapidAPI-Host': process.env.REACT_APP_X_RAPIDAPI_HOST,
	}
};