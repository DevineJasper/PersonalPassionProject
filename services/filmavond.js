'use strict';

// Imports dependencies
const Response = require('./response'),
	config = require('./config');

module.exports = class Filmavond {
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
					`${config.appUrl}/movieDb.png`,
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
			`${this.user.firstName}, vanavond is het de filmavond!`
		);
		let instructie = Response.genText('Alles staat klaar voor jullie.');
		let bis = Response.genText('Jullie zijn welkom vanaf XX uur!');
		let action = Response.genQuickReply('Waarop wil je stemmen?', [
			{
				title: 'Stemmen op film',
				payload: 'STEMMING_FILM'
			},
			{
				title: 'Stemmen op andere',
				payload: 'STEMMING_ANDERE'
			}
		]);
		return [hello, instructie, bis, action];
	};
};
