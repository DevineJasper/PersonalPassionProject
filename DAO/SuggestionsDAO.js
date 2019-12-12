const DAO = require('./dao');
const knex = require('knex')(DAO);

module.exports = class SuggestionsDAO {
	static addDrinkSuggestion = async (psid, drink) => {
		const drinkTitle = drink.title;
		const drinkDesc = drink.desc;
		const drinkLink = drink.link;
		await knex.from(`DrinkSuggestions`).insert({
			psid: psid,
			title: drinkTitle,
			beschrijving: drinkDesc,
			link: drinkLink
		});
	};

	static getAllDrinkSuggestions = async () => {
		let suggestions = [];
		await knex
			.from(`DrinkSuggestions`)
			.select('*')
			.then(r => {
				suggestions = r;
			});
		return suggestions;
	};

	static getAllSnackSuggestions = async () => {
		let suggestions = [];
		await knex
			.from(`SnackSuggestions`)
			.select('*')
			.then(r => {
				suggestions = r;
			});
		return suggestions;
	};

	static addSnackSuggestion = async (psid, snack) => {
		const snackTitle = snack.title;
		const snackDesc = snack.desc;
		const snackLink = snack.link;
		await knex.from(`SnackSuggestions`).insert({
			psid: psid,
			title: snackTitle,
			beschrijving: snackDesc,
			link: snackLink
		});
	};

	static setMovieSuggestions = async movies => {
		await knex.from(`MovieSuggestions`).insert(movies);
	};

	static getMovieSuggestionsById = async user => {
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
