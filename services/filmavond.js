'use strict';

// Imports dependencies
const Response = require('./response'),
	config = require('./config');

module.exports = class Filmavond {
	constructor(user, webhookEvent) {
		this.user = user;
		this.webhookEvent = webhookEvent;
	}

	genFirstResponse = () => {
		// let image = Response.genImageAttachement(`${config.appUrl}/stemming.gif`);
		let hello = Response.genText(
			`💥 ${this.user.firstName}, vanavond is het de filmavond! 💥`
		);
		let instructie = Response.genText('👌 Alles staat klaar voor jullie.');
		let bis = Response.genText('‼️ Jullie zijn welkom vanaf XX uur! ‼️');
		let action = Response.genQuickReply('Jij komt toch ook!?', [
			{
				title: 'Ik kom! :D',
				payload: 'FINAL_AANWEZIG'
			},
			{
				title: 'Ik kom niet :(',
				payload: 'FINAL_AFWEZIG'
			}
		]);
		return [hello, instructie, bis, action];
	};
};
