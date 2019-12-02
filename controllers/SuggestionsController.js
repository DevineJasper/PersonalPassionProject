const SuggestionsDAO = require('../DAO/SuggestionsDAO.js');

module.exports = class SuggestionsController {
	static setMovieSuggestions = async movies => {
		SuggestionsDAO.setMovieSuggestions(movies);
	};

	static getMovieSuggestions = async psid => {
		const userSuggestions = await SuggestionsDAO.getMovieSuggestions(psid);
		return userSuggestions;
	};

	static removeMovieSuggestions = async (psid, movies) => {
		SuggestionsDAO.removeMovieSuggestions(psid, movies);
	};
};
