'use strict';

// Imports dependencies
const Response = require('./response'),
	config = require('./config'),
	request = require('request'),
	ParticipantsController = require('../controllers/ParticipantsController');

module.exports = class Selectie {
	constructor(user, webhookEvent) {
		this.user = user;
		this.webhookEvent = webhookEvent;
	}

	handlePayload = payload => {
		let response;

		switch (payload) {
			case 'SELECTIE_FILM':
				const webButton = Response.genWebUrlButton(
					'Mijn suggesties',
					`${config.siteUrl}/suggesties/films/${this.user.psid}`
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
							payload: 'SELECTIE_TERUG'
						}
					]
				);
				break;
			case 'SELECTIE_ANDERE':
				const drinksBtn = Response.genWebUrlButton(
					'Drinks',
					`${config.siteUrl}/suggesties/drinks/${this.user.psid}`
				);
				const snacksBtn = Response.genWebUrlButton(
					'Snacks',
					`${config.siteUrl}/suggesties/snacks/${this.user.psid}`
				);
				const buttons = Response.genButtonTemplate('Welke suggestie?', [
					drinksBtn,
					snacksBtn
				]);
				const back = Response.genQuickReply('Als je klaar bent kan je terug!', [
					{
						title: 'Terug',
						payload: 'SELECTIE_TERUG'
					}
				]);

				response = [buttons, back];
				break;
			case 'SELECTIE_TERUG':
				response = Response.genQuickReply('Wat wil je doen?', [
					{
						title: 'Info',
						payload: 'SELECTIE_INFO'
					},
					{
						title: '🍕 & 🍺',
						payload: 'SELECTIE_ANDERE'
					}
				]);
				break;
			case 'SELECTIE_HELPEN':
				ParticipantsController.setVolunteer(this.user.psid);
				let bedankt = Response.genText(
					`Bedankt ${this.user.firstName} 🥳 Wij nemen zo snel mogelijk contact met je op!`
				);
				let doen = Response.genQuickReply('Wat wil je doen?', [
					{
						title: '🍕 & 🍺',
						payload: 'SELECTIE_ANDERE'
					}
				]);
				response = [bedankt, doen];
				break;
			case 'SELECTIE_INFO':
				let filmavond = Response.genText(
					'De filmavond gaat door op 21 februari.'
				);
				let suggestieronde = Response.genText(
					'Je kan jouw suggesties doorsturen tot 14 februari!'
				);
				let helpen = Response.genQuickReply(
					'We zoeken altijd naar enthousiaste vrijwilligers om te helpen bij de organisatie van de filmavond :D',
					[
						{
							title: '💪🏻 Ik wil helpen',
							payload: 'SELECTIE_HELPEN'
						},
						{
							title: '◀️ Terug',
							payload: 'SELECTIE_TERUG'
						}
					]
				);
				response = [filmavond, suggestieronde, helpen];
				break;
		}

		return response;
	};

	genFirstResponse = () => {
		let hello = Response.genText(`⚬ ☼☱☴☼ BEEP ☼☵☷☵☼ BOOP ☼☴☱☼ ⚬`);
		let instructie = Response.genText('🤖 BELANGRIJK BERICHT 🤖');
		let selecteren = Response.genText(
			'‼️ De filmsuggesties zijn goed ontvangen ‼️'
		);
		let result = Response.genText(
			'🤖 Ik zal nu een selectie maken uit jullie filmsuggesties 🤖'
		);
		let stemmen = Response.genText(
			'🤖 Vanaf <datum> kunnen jullie dan stemmen op jullie favoriete film 🤖'
		);
		let helpen = Response.genQuickReply(
			'🤖 Als je wilt kun je steeds 🍕snack- en 🍺drinksuggesties doorsturen 🤖',
			[
				{
					title: '🍕 & 🍺',
					payload: 'SELECTIE_ANDERE'
				}
			]
		);
		return [hello, instructie, selecteren, result, stemmen, helpen];
	};
};
