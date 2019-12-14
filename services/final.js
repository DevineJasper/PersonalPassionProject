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
			case 'SUGGESTIE_FILM':
				const webButton = Response.genWebUrlButton(
					'Mijn suggesties',
					config.siteUrl
				);
				response = Response.genGenericTemplate(
					`${config.appUrl}/assets/images/movieDb.png`,
					`Filmsuggesties van ${this.user.firstName}`,
					'Welke film wil jij bekijken op de filmavond?',
					[
						webButton,
						{
							type: 'postback',
							title: 'Terug',
							payload: 'GET_STARTED'
						}
					]
				);
				break;
			case 'SUGGESTIE_ANDERE':
				const drinksBtn = Response.genWebUrlButton('Drinks', config.siteUrl);
				const snacksBtn = Response.genWebUrlButton('Snacks', config.siteUrl);
				const themaBtn = Response.genWebUrlButton('Thema', config.siteUrl);
				const buttons = Response.genButtonTemplate('Welke suggestie?', [
					drinksBtn,
					snacksBtn,
					themaBtn
				]);
				const back = Response.genQuickReply('Als je klaar bent kan je terug!', [
					{
						title: 'Terug',
						payload: 'GET_STARTED'
					}
				]);

				response = [buttons, back];
				break;
		}

		return response;
	};

	genFirstResponse = () => {
		// let image = Response.genImageAttachement(`${config.appUrl}/stemming.gif`);
		let hello = Response.genText(
			`De filmavond van <DATUM> ligt helemaal vast! Bekijk hier de resultaten :o`
		);
		let instructie = Response.genText(
			'De organisatie zal nu alles voorbereiden ;)'
		);
		let bis = Response.genQuickReply('Jij komt toch ook!?', [
			{
				title: 'Ik kom!',
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
			`${config.appUrl}/assets/images/movieDb.png`,
			`Filmavond van <DATUM>`,
			'Hoe ziet jullie filmavond eruit?',
			[movieButton, consumptieButton]
		);
		return [hello, results, instructie, bis];
	};
};
