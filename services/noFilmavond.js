'use strict';

// Imports dependencies
const Response = require('./response'),
	ParticipantsController = require('../controllers/ParticipantsController');

module.exports = class noFilmavond {
	constructor(user, webhookEvent) {
		this.user = user;
		this.webhookEvent = webhookEvent;
	}

	handlePayload = payload => {
		let response;

		switch (payload) {
			case 'NOFILMAVOND_HELPEN':
				ParticipantsController.setVolunteer(this.user.psid);
				let bedankt = Response.genText(
					`Bedankt ${this.user.firstName} 🥳 Wij nemen zo snel mogelijk contact met je op!`
				);
				let veranderen = Response.genQuickReply('Indien je je bedenkt...', [
					{
						title: '😿 Ik help niet',
						payload: 'NOFILMAVOND_NOT_HELP'
					}
				]);
				response = [bedankt, veranderen];
				break;
			case 'NOFILMAVOND_NOT_HELP':
				ParticipantsController.removeVolunteer(this.user.psid);
				let huilen = Response.genText('😿😿😿😿😿');
				let huilenNog = Response.genText('😢😢😢😢😢');
				let helpen = Response.genQuickReply('Als je je bedenkt...', [
					{
						title: '💪🏻 Ik wil helpen',
						payload: 'NOFILMAVOND_HELPEN'
					}
				]);
				response = [huilen, huilenNog, helpen];
				break;
		}
		return response;
	};

	genFirstResponse = () => {
		let hello = Response.genText(`👋 Hey ${this.user.firstName}!`);
		let instructie = Response.genText(
			'❌ Momenteel staat geen filmavond gepland ❌'
		);
		let result = Response.genText(
			'🤖 Als daar verandering in komt, dan laten ik het je zeker weten 🤖'
		);
		let helpen = Response.genQuickReply(
			'🤖 Ik ben steeds op zoek naar mensen die mij willen helpen bij de organisatie van de filmavond! 🤖',
			[
				{
					title: '💪🏻 Ik wil helpen',
					payload: 'NOFILMAVOND_HELPEN'
				}
			]
		);
		return [hello, instructie, result, helpen];
	};
};
