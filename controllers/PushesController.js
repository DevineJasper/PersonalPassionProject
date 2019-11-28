const Response = require('../services/response');
const ParticipantsDAO = require('../DAO/ParticipantsDAO');
const Receive = require('../services/receive');

module.exports = class PushesController {
	static handlePayload = async req => {
		const payload = req.body.payload;
		const participants = await ParticipantsDAO.getPhase(req.body.phase);
		// console.log(`Participants in fase ${req.body.phase}:`);
		// console.log(participants);
		// GraphAPI.callFBAEventsAPI
		let response;
		switch (payload) {
			case 'REMINDER':
				response = Response.genText('Héla, blijf es van mijn knoppen');
				break;
		}
		participants.forEach(participant => {
			console.log(participant);
			const pushMessage = new Receive(null, null);
			pushMessage.sendPush(response, participant);
		});
	};
};
