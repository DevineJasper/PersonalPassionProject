const config = require('../services/config');
const StemmingController = require('../controllers/StemmingController');

module.exports = app => {
	//render routes
	app.get('/final/film', async (req, res) => {
		console.log('final film opvragen')
		const stemmingMovies = await StemmingController.getVotes();
		const highestVotes = await StemmingController.getHighestVotes(
			stemmingMovies
		);
		console.log(highestVotes);
		res.render('../views/final/film', {
			url: config.appUrl,
			film: highestVotes[0].film
		});
	});
	app.get('/final/consumpties', async (req, res) => {
	
		console.log('hey hey heeeyyyy');
		console.log(selectionMovies);
		res.render('../views/final/consumpties');
	});
};
