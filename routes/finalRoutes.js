const config = require('../services/config');
const StemmingController = require('../controllers/StemmingController');

module.exports = app => {
	//render routes
	app.get('/final/film', async (req, res) => {
		const stemmingMovies = await StemmingController.getVotes();
		const highestVotes = await StemmingController.getHighestVotes(
			stemmingMovies
		);
		console.log(highestVotes);
		res.render('../views/final/film', {
			url: config.appUrl,
			film: highestVotes.film
		});
	});
	app.get('/final/consumpties', async (req, res) => {
		let selectionMovies = await SelectionController.getMovieSelection();
		console.log('hey hey heeeyyyy');
		console.log(selectionMovies);
		res.render('../views/final/consumpties', {
			final_drinks: drink,
			final_snacks: snacks
		});
	});
};