'use strict';

const Response = require('../services/response');
const ParticipantsDAO = require('../DAO/ParticipantsDAO');
const Receive = require('../services/receive');
const CinemaEventDAO = require('../DAO/CinemaEventDAO');

module.exports = class AdminController {
	static handlePayload = async (payload, recipient, phase, text) => {
		console.log('handlePlayload bij AdminController');
		console.log(recipient);
		const pushMessage = new Receive(recipient, null, phase);
		pushMessage.handlePushPayload(payload, text);
	};
};
