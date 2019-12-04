const SuggestionsController = require('../controllers/SuggestionsController.js');
const config = require('../services/config');

module.exports = app => {
	//render routes
	app.get('/suggesties/films', (req, res) => {
		res.render('../views/suggesties/films', { url: config.appUrl });
	});

	app.get('/suggesties/snacks', (req, res) => {
		res.render('../views/suggesties/snacks', {
			url: config.appUrl
		});
	});

	app.get('/suggesties/drinks', (req, res) => {
		res.render('../views/suggesties/drinks', {
			url: config.appUrl
		});
	});

	app.get('/suggesties/themas', (req, res) => {
		res.render('../views/suggesties/themas', {
			url: config.appUrl
		});
	});
	//API routes
	app.get('/api/suggestions/movies', async (req, res) => {
		const userSuggestions = await SuggestionsController.getAllMovieSuggestions();
		res.json(userSuggestions);
	});

	app.post('/suggestions/movies/:psid', async (req, res) => {
		const movies = req.body.movies;
		const userSuggestions = await SuggestionsController.setMovieSuggestions(
			movies
		);
		res.status(201).json(userSuggestions);
	});

	app.get('/suggestions/movies/:psid', async (req, res) => {
		const psid = req.params.psid;
		const userSuggestions = await SuggestionsController.getMovieSuggestions(
			psid
		);
		res.json(userSuggestions);
	});

	app.delete('/suggestions/movies/:psid', async (req, res) => {
		const psid = req.body.psid;
		const movies = req.body.movieId;
		SuggestionsController.removeMovieSuggestions(psid, movies);
		res.json(`Removed ${movies} for ${psid}`);
	});
};
