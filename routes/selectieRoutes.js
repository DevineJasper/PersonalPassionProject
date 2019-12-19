const SelectionController = require('../controllers/SelectionController.js');
// const config = require('../services/config');
// const fetch = require('node-fetch');

module.exports = app => {
	//API routes
	app.post('/api/selection/films', async (req, res) => {
		const movies = req.body.movies;
		const userSuggestions = await SelectionController.setMovieSelection(movies);
		res.status(201).json(userSuggestions);
	});

	app.get('/api/selection/films', async (req, res) => {
		const userSuggestions = await SelectionController.getMovieSelection();
		res.json(userSuggestions);
	});

	app.delete('/api/selection/films', async (req, res) => {
		const psid = req.body.psid;
		const movies = req.body.movieId;
		SelectionController.removeMovieSelection(psid, movies);
		res.json(`Removed ${movies} for ${psid}`);
	});
};
