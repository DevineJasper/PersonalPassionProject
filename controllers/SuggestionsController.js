const SuggestionsDAO = require('../DAO/SuggestionsDAO.js');
const request = require('request');
const fetch = require('node-fetch');

module.exports = class SuggestionsController {
	static setMovieSuggestions = async movies => {
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
