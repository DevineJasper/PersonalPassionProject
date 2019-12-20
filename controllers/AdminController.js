'use strict';

const Receive = require('../services/receive');

module.exports = class AdminController {
	static handlePayload = async (payload, recipient, phase, text) => {
		console.log('handlePlayload bij AdminController');
		console.log(recipient);
		const pushMessage = new Receive(recipient, null, phase);
		pushMessage.handlePushPayload(payload, text);
	};
};
