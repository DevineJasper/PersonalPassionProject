const AdminController = require('../controllers/AdminController');

module.exports = app => {
	//API routes
	app.post('/admin/push', (req, res) => {
		const recipients = req.body.recipients;
		const payload = req.body.payload;
		const phase = req.body.phase;
		const text = req.body.text;
		recipients.forEach(recipient => {
			AdminController.handlePayload(payload, recipient, phase, text);
		});
		res.json({
			message: 'Goed gepost!'
		});
	});
};
