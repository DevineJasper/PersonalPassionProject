'use strict';

// Imports dependencies
const Response = require('./response'),
	ParticipantsController = require('../controllers/ParticipantsController');

module.exports = class Suggestie {
	constructor(user, webhookEvent) {
		this.user = user;
		this.webhookEvent = webhookEvent;
	}

	handlePayload = payload => {
		let response;

		switch (payload) {
			case 'WACHTEN_HELPEN':
				ParticipantsController.setVolunteer(this.user.psid);
				let bedankt = Response.genText(
					`Bedankt ${this.user.firstName} 🥳 Wij nemen zo snel mogelijk contact met je op!`
				);
				let veranderen = Response.genQuickReply('Indien je je bedenkt...', [
					{
						title: '😿 Ik help niet',
						payload: 'WACHTEN_NOT_HELP'
					}
				]);
				response = [bedankt, veranderen];
				break;
			case 'WACHTEN_NOT_HELP':
				ParticipantsController.removeVolunteer(this.user.psid);
				let huilen = Response.genText('😿😿😿😿😿');
				let huilenNog = Response.genText('😢😢😢😢😢');
				let helpen = Response.genQuickReply('Als je je bedenkt...', [
					{
						title: '💪🏻 Ik wil helpen',
						payload: 'WACHTEN_HELPEN'
					}
				]);
				response = [huilen, huilenNog, helpen];
				break;
		}
		return response;
	};

	genFirstWachten = () => {
		let hello = Response.genText(`Hey ${this.user.firstName}!`);
		let instructie = Response.genText(
			'Momenteel staat er geen filmavond ingepland.'
		);
		let result = Response.genText(
			'Als daar verandering in komt, dan laten we je het hier onmiddellijk weten ;)'
		);
		let helpen = Response.genQuickReply(
			'We zoeken altijd naar enthousiaste vrijwilligers om te helpen bij de organisatie van de filmavond :D',
			[
				{
					title: '💪🏻 Ik wil helpen',
					payload: 'WACHTEN_HELPEN'
				}
			]
		);
		return [hello, instructie, result, helpen];
	};
};
