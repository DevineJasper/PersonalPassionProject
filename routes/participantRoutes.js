const ParticipantsController = require('../controllers/ParticipantsController');

module.exports = app => {
	//API routes
	app.get('/participants', async (req, res) => {
		const participants = await ParticipantsController.getUsers();
		res.json(participants);
	});

	app.get('/participants/vrijwilligers', async (req, res) => {
		const vrijwilligers = await ParticipantsController.getVolunteers();
		res.json(vrijwilligers);
	});
};
