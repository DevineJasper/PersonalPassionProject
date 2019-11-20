module.exports = app => {
	const database = require('../database.js');
	app.get('/test', database);
};
