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

	app.put('/participants/:psid', async (req, res) => {
		const fase = req.body.phase;
		const psid = req.params.psid;
		console.log(fase);
		await ParticipantsController.updateParticipantPhase(fase, psid);
	});

	app.get('/participants/:phase', async (req, res) => {
		const participantsPhase = req.params.phase;
		const participants = await ParticipantsController.getUsersByPhase(
			participantsPhase
		);
		res.json(participants);
	});
};
