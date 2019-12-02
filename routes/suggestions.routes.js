const SuggestionsController = require('../controllers/SuggestionsController.js');

module.exports = app => {
	app.post('/suggestions/movies/:psid', async (req, res) => {
		const movies = req.body.movies;
		const userSuggestions = await SuggestionsController.setMovieSuggestions(
			movies
		);
		res.status(201).json('userSuggestions');
	});

	app.get('/suggestions/movies/:psid', async (req, res) => {
		const psid = req.params.psid;
		const userSuggestions = await SuggestionsController.getMovieSuggestions(
			psid
		);
		res.json(userSuggestions);
	});

	app.put('/suggestions/movies/:psid', async (req, res) => {
		const data = req.body;
		const db = new MoviesDAO();
		await db.connect();
		let userSuggestions = await db.changeMovieSuggestions(data);
		db.disconnect();
		res.json({ suggestions: userSuggestions });
	});

	app.delete('/suggestions/movies/:psid', async (req, res) => {
		const psid = req.body.psid;
		const movies = req.body.movieId;
		SuggestionsController.removeMovieSuggestions(psid, movies);
		res.json(`Removed ${movies} for ${psid}`);
	});
};
