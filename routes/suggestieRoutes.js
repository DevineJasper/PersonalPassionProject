const SuggestionsController = require('../controllers/SuggestionsController.js');
const config = require('../services/config');
const fetch = require('node-fetch');

module.exports = app => {
	//render routes
	app.get('/suggesties/films/:psid', async (req, res) => {
		counter = 0;
		movies = [];
		const id = req.params.psid;
		const userMovies = await SuggestionsController.getMovieSuggestionsById(id);
		userMovies.forEach(async suggestion => {
			await fetch(
				`https://api.themoviedb.org/3/movie/${suggestion.movieId}?api_key=a108ea578de94e9156c38073bbd89613&language=en-En`
			)
				.then(r => r.json())
				.then(data => {
					movies.push(data);
					counter++;
					if (counter === userMovies.length) {
						render();
					}
				});
		});
		render = () => {
			res.render('../views/suggesties/suggestionFilms', {
				url: config.appUrl,
				psid: id,
				suggestions_movie: movies
			});
		};
	});

	app.get('/suggesties/snacks/:psid', (req, res) => {
		res.render('../views/suggesties/suggestionSnacks', {
			url: config.appUrl,
			soort: 'snack'
		});
	});

	app.get('/suggesties/drinks/:psid', (req, res) => {
		res.render('../views/suggesties/suggestionDrinks', {
			url: config.appUrl,
			soort: 'drink',
			psid: req.params.psid
		});
	});

	//API routes
	app.post('/api/suggesties/drinks/:psid', (req, res) => {
		const psid = req.params.psid;
		const drinkBody = req.body.suggestion;
		SuggestionsController.addDrinkSuggestion(psid, drinkBody);
		res.status(201).json('Drink suggestion added');
	});

	app.post('/api/suggesties/snacks/:psid', (req, res) => {
		const psid = req.params.psid;
		const snackBody = req.body.suggestion;
		SuggestionsController.addDrinkSuggestion(psid, snackBody);
		res.status(201).json('Drink suggestion added');
	});

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
