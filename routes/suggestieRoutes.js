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
			console.log('hij rendert!');
			res.render('../views/suggesties/suggestionFilms', {
				url: config.appUrl,
				psid: id,
				suggestions_movie: movies
			});
		};
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
