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
			case 'SUGGESTIE_FILM':
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
							payload: 'SUGGESTIE_TERUG'
						}
					]
				);
				break;
			case 'SUGGESTIE_ANDERE':
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
						payload: 'SUGGESTIE_TERUG'
					}
				]);

				response = [buttons, back];
				break;
			case 'SUGGESTIE_TERUG':
				response = Response.genQuickReply('Wat wil je doen?', [
					{
						title: 'Info',
						payload: 'SUGGESTIE_INFO'
					},
					{
						title: 'Filmsuggesties',
						payload: 'SUGGESTIE_FILM'
					},
					{
						title: 'Andere suggesties',
						payload: 'SUGGESTIE_ANDERE'
					}
				]);
				break;
			case 'SUGGESTIE_HELPEN':
				ParticipantsController.setVolunteer(this.user.psid);
				let bedankt = Response.genText(
					`Bedankt ${this.user.firstName} 🥳 Wij nemen zo snel mogelijk contact met je op!`
				);
				let doen = Response.genQuickReply('Wat wil je doen?', [
					{
						title: 'Info',
						payload: 'SUGGESTIE_INFO'
					},
					{
						title: 'Filmsuggesties',
						payload: 'SUGGESTIE_FILM'
					},
					{
						title: 'Andere suggesties',
						payload: 'SUGGESTIE_ANDERE'
					}
				]);
				response = [bedankt, doen];
				break;
			case 'SUGGESTIE_INFO':
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
							payload: 'SUGGESTIE_HELPEN'
						},
						{
							title: '◀️ Terug',
							payload: 'SUGGESTIE_TERUG'
						}
					]
				);
				response = [filmavond, suggestieronde, helpen];
				break;
		}

		return response;
	};

	genFirstResponse = () => {
		let hello = Response.genText(
			`Jullie suggesties zijn goed ontvangen! Alvast bedankt <3`
		);
		let instructie = Response.genText(
			'De organisatie zal jullie suggesties nu bekijken en er een selectie uit maken.'
		);
		let result = Response.genText(
			'En jij kan vanaf <DATUM> stemmen op jouw favoriet uit onze selectie!'
		);
		let action = Response.genQuickReply(
			'Welke soort suggestie wil je doorsturen?',
			[
				{
					title: 'Filmsuggesties',
					payload: 'SUGGESTIE_FILM'
				},
				{
					title: 'Andere suggesties',
					payload: 'SUGGESTIE_ANDERE'
				}
			]
		);
		return [hello, instructie, result, action];
	};
};
