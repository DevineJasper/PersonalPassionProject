const GraphAPI = require('../services/graph-api');
const PushesController = require('../controllers/PushesController');
const Receive = require('../services/receive');

module.exports = app => {
	app.post('/webhook/push', (req, res) => {
		PushesController.handlePayload(req);
	});
};
