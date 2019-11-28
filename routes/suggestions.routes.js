const MoviesDAO = require('../controllers/suggestions.controller.js');

module.exports = app => {
	app.post('/suggestions/movies/:psid', async (req, res) => {
		const data = req.body;
		const db = new MoviesDAO();
		await db.connect();
		await db.setMovieSuggestion(data);
		db.disconnect();
		res.status(201).json({
			message: 'movie suggestion posted'
		});
	});

	app.get('/suggestions/movies/:psid', async (req, res) => {
		const psid = req.params.psid;
		const db = new MoviesDAO();
		await db.connect();
		let userSuggestions = await db.getMovieSuggestions(psid);
		db.disconnect();
		res.json({ suggestions: userSuggestions });
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
		const data = req.body;
		const db = new MoviesDAO();
		await db.connect();
		let userSuggestions = await db.deleteMovieSuggestions(data);
		db.disconnect();
		res.json({ suggestions: userSuggestions });
	});
};
