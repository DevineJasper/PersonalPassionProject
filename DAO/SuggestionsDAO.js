const DAO = require('./dao');
const knex = require('knex')(DAO);

module.exports = class SuggestionsDAO {
	static setMovieSuggestions = async movies => {
		await knex.from(`MovieSuggestions`).insert(movies);
	};

	static getMovieSuggestions = async user => {
		let suggestions = [];
		await knex
			.from(`MovieSuggestions`)
			.select(`movieId`)
			.where({ psid: user })
			.then(r => {
				suggestions = r;
			});
		return await suggestions;
	};

	static getAllMovieSuggestions = async () => {
		let suggestions = [];
		await knex
			.from(`MovieSuggestions`)
			.select(`movieId`)
			.then(r => {
				suggestions = r;
			});
		return suggestions;
	};

	static removeMovieSuggestions = async (user, movies) => {
		await knex
			.from(`MovieSuggestions`)
			.whereIn('movieId', movies)
			.where({ psid: user })
			.del();
	};
};
