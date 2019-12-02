'use strict';

const Response = require('../services/response');
const ParticipantsDAO = require('../DAO/ParticipantsDAO');
const Receive = require('../services/receive');
const CinemaEventDAO = require('../DAO/CinemaEventDAO');

module.exports = class AdminController {
	static handlePayload = async (payload, recipient, phase) => {
		const pushMessage = new Receive(recipient, null, phase);
		pushMessage.handlePushPayload(payload);
	};
};
