const AdminController = require('../controllers/AdminController');

module.exports = app => {
	app.post('/admin/push', (req, res) => {
		AdminController.handlePayload(req);
		res.json({
			message: 'Goed gepost!'
		});
	});
};
