'use strict';

// Imports dependencies
const Response = require('./response'),
	config = require('./config');

module.exports = class Final {
	constructor(user, webhookEvent) {
		this.user = user;
		this.webhookEvent = webhookEvent;
	}

	handlePayload = payload => {
		let response;

		switch (payload) {
			case 'FINAL_AANWEZIG':
				response = Response.genText('Super! 🎉')
				break;
			case 'FINAL_AFWEZIG':
				response = Response.genText('Spijtig 😢😢😢')
				break;
		}

		return response;
	};

	genFirstResponse = () => {
		let hello = Response.genText(`⚬ ☼☱☴☼ BEEP ☼☵☷☵☼ BOOP ☼☴☱☼ ⚬`);
		let belangrijk = Response.genText('🤖 BELANGRIJK BERICHT 🤖')
		let vast = Response.genText(
			`‼️ De filmavond van <DATUM> ligt helemaal vast! Bekijk hier de resultaten ‼️`
		);
		let instructie = Response.genText(
			'🤖 De organisatie zal nu alles voorbereiden 🤖'
		);
		let bis = Response.genQuickReply('Jij komt toch ook!?', [
			{
				title: 'Ik kom! :D',
				payload: 'FINAL_AANWEZIG'
			},
			{
				title: 'Ik kom niet :(',
				payload: 'FINAL_AFWEZIG'
			}
		]);
		const movieButton = Response.genWebUrlButton(
			'Winnende film',
			`${config.siteUrl}/final/film`
		);
		const consumptieButton = Response.genWebUrlButton(
			'Snacks & drinks',
			`${config.siteUrl}/final/consumpties`
		);
		let results = Response.genGenericTemplate(
			`${config.appUrl}/assets/images/film.png`,
			`Filmavond van <DATUM>`,
			'Hoe ziet jullie filmavond eruit?',
			[movieButton, consumptieButton]
		);
		return [hello, belangrijk, vast, results, instructie, bis];
	};
};
