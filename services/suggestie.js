'use strict';

// Imports dependencies
const Response = require('./response'),
	config = require('./config'),
	request = require('request'),
	ParticipantsController = require('../controllers/ParticipantsController');

module.exports = class Suggestie {
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
					`${config.siteUrl}/suggesties/drinks`
				);
				const snacksBtn = Response.genWebUrlButton(
					'Snacks',
					`${config.siteUrl}/suggesties/snacks`
				);
				const themaBtn = Response.genWebUrlButton(
					'Thema',
					`${config.siteUrl}/suggesties/themas`
				);
				const buttons = Response.genButtonTemplate('Welke suggestie?', [
					drinksBtn,
					snacksBtn,
					themaBtn
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

	genFirstSuggestie = () => {
		let hello = Response.genText(`Hey ${this.user.firstName}!`);
		let instructie = Response.genText(
			'Wij organiseren een filmavond op 21 februari'
		);
		let result = Response.genText(
			"Stuur jouw suggesties door voor films, snacks, drinks en thema's..."
		);
		let final = Response.genText(
			'En wie weet selecteren we jouw suggesties voor de volgende ronde!'
		);
		let bis = Response.genText('Je kan suggesties doorsturen tot 14 februari.');
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
		return [hello, instructie, result, final, bis, action];
	};
};
