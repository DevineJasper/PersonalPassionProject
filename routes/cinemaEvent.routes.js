const CinemaEventDAO = require('../controllers/cinemaEvent.controller.js');

module.exports = app => {
	app.put('/cinemaEvent', async (req, res) => {
		console.log('in route');
		const data = req.body;
		console.log(data);
		const dao = new CinemaEventDAO();
		await dao.setEvent(data);
	});
};
