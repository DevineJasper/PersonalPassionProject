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

	genFirstResponse = () => {
		let hello = Response.genText(`⚬ ☼☱☴☼ BEEP ☼☵☷☵☼ BOOP ☼☴☱☼ ⚬`);
		let instructie = Response.genText('🤖 BELANGRIJK BERICHT 🤖');
		let result = Response.genText(
			'‼️ Er is een filmavond gepland op <datum> ‼️'
		);
		let action = Response.genText(
			'‼️ Vanaf <datum> kan jij suggesties doorsturen via de chatbot ‼️'
		);
		let info = Response.genText(
			'🤖 Kijk zeker eens op de cinematjes facebookpagina voor meer informatie 🤖'
		);
		let helpen = Response.genQuickReply(
			'🤖 Ik ben steeds op zoek naar mensen die mij willen helpen bij de organisatie van de filmavond! 🤖',
			[
				{
					title: '💪🏻 Ik wil helpen',
					payload: 'WACHTEN_HELPEN'
				}
			]
		);
		return [hello, instructie, result, action, info, helpen];
	};
};
