const SuggestionsDAO = require('../DAO/SuggestionsDAO.js');
const request = require('request');
const fetch = require('node-fetch');

module.exports = class SuggestionsController {
	static addDrinkSuggestion = async (psid, drinkBody) => {
		console.log(psid);
		console.log(drinkBody);
		SuggestionsDAO.addDrinkSuggestion(psid, drinkBody);
	};

	static getAllDrinkSuggestions = async () => {
		const drinkSuggestions = await SuggestionsDAO.getAllDrinkSuggestions();
		return drinkSuggestions;
	};

	static getAllSnackSuggestions = async () => {
		const snackSuggestions = await SuggestionsDAO.getAllSnackSuggestions();
		return snackSuggestions;
	};

	static addSnackSuggestion = async (psid, snackBody) => {
		SuggestionsDAO.addSnackSuggestoin(psid, snackBody);
	};

	static setMovieSuggestions = movies => {
		SuggestionsDAO.setMovieSuggestions(movies);
	};

	static getAllMovieSuggestions = async () => {
		const userSuggestions = await SuggestionsDAO.getAllMovieSuggestions();
		return userSuggestions;
	};

	static getMovieSuggestionsById = async psid => {
		const userSuggestions = await SuggestionsDAO.getMovieSuggestionsById(psid);
		return userSuggestions;
	};

	static removeMovieSuggestions = async (psid, movies) => {
		SuggestionsDAO.removeMovieSuggestions(psid, movies);
	};
};
