const config = require('../services/config');
const SelectionController = require('../controllers/SelectionController');
const StemmingController = require('../controllers/StemmingController');

module.exports = app => {
	//render routes
	app.get('/stemming/:psid', async (req, res) => {
		const psid = req.params.psid;
		let selectionMovies = await SelectionController.getMovieSelection();
		console.log('hey hey heeeyyyy');
		console.log(selectionMovies);
		res.render('../views/stemming/stemmingFilms', {
			psid: psid,
			url: config.appUrl,
			selection: selectionMovies
		});
	});

	//API routes
	app.post('/api/stemming/:psid', async (req, res) => {
		const psid = req.params.psid;
		const movie = req.body.film;
		console.log(psid);
		await StemmingController.setStemming(psid, movie);
	});
};
