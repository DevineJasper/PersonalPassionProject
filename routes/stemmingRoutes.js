const config = require('../services/config');

module.exports = app => {
	//render routes
	app.get('/stemming/films', (req, res) => {
		res.render('../views/stemming/films', { url: config.appUrl });
	});

	app.get('/stemming/drinks', (req, res) => {
		res.render('../views/stemming/drinks', { url: config.appUrl });
	});

	app.get('/stemming/snacks', (req, res) => {
		res.render('../views/stemming/snacks', { url: config.appUrl });
	});

	app.get('/stemming/themas', (req, res) => {
		res.render('../views/stemming/themas', { url: config.appUrl });
	});
	//API routes
};
