'use strict';

// Imports dependencies
const Response = require('./response'),
	config = require('./config');

module.exports = class Stemming {
	constructor(user, webhookEvent) {
		this.user = user;
		this.webhookEvent = webhookEvent;
	}

	handlePayload = payload => {
		let response;

		switch (payload) {
			case 'STEMMING_FILM':
				const webButton = Response.genWebUrlButton(
					'Stemmen op film',
					`${config.siteUrl}/stemming/films`
				);
				response = Response.genGenericTemplate(
					`${config.appUrl}/assets/images/movieDb.png`,
					`Film stemming van ${this.user.firstName}`,
					'Stem op jouw favoriet voor op de filmavond!',
					[
						webButton,
						{
							type: 'postback',
							title: 'Terug',
							payload: 'STEMMING_TERUG'
						}
					]
				);
				break;
			case 'STEMMING_ANDERE':
				const drinksBtn = Response.genWebUrlButton(
					'Drinks',
					`${config.siteUrl}/stemming/drinks`
				);
				const snacksBtn = Response.genWebUrlButton(
					'Snacks',
					`${config.siteUrl}/stemming/snacks`
				);
				const themaBtn = Response.genWebUrlButton(
					'Thema',
					`${config.siteUrl}/stemming/themas`
				);
				const buttons = Response.genButtonTemplate('Welke suggestie?', [
					drinksBtn,
					snacksBtn,
					themaBtn
				]);
				const back = Response.genQuickReply('Als je klaar bent kan je terug!', [
					{
						title: 'Terug',
						payload: 'STEMMING_TERUG'
					}
				]);
				response = [buttons, back];
				break;
			case 'STEMMING_TERUG':
				const fase = Response.genText(
					'Je kan momenteel stemmen op jouw favorieten.'
				);
				const doen = Response.genQuickReply('Wat wil je doen?', [
					{
						title: 'Info',
						payload: 'STEMMING_INFO'
					},
					{
						title: 'Stemmen op film',
						payload: 'STEMMING_FILM'
					},
					{
						title: 'Stemmen op andere',
						payload: 'STEMMING_ANDERE'
					}
				]);
				response = [fase, doen];
				break;
			case 'STEMMING_INFO':
				let filmavond = Response.genText(
					'De filmavond gaat door op 21 februari.'
				);
				let stemronde = Response.genQuickReply(
					'En je kan stemmen tot en met 20 februari!',
					[
						{
							title: 'Terug',
							payload: 'STEMMING_TERUG'
						}
					]
				);
				response = [filmavond, stemronde];
				break;
		}

		return response;
	};

	genFirstStemming = () => {
		// let image = Response.genImageAttachement(`${config.appUrl}/stemming.gif`);
		let hello = Response.genText(`Hey ${this.user.firstName}!`);
		let instructie = Response.genText(
			'De filmavond van 21 februari krijgt steeds meer vorm!'
		);
		let bis = Response.genText(
			'We hebben een selectie gemaakt uit al jullie suggesties.'
		);
		let result = Response.genText(
			'wie weet zitten jouw suggesties er wel bij...'
		);
		let final = Response.genText(
			'Je kan stemmen op jouw favorieten tot 20 februari. De film, drink, snack en thema met de meeste stemmen, die worden gebruikt!'
		);
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
		return [hello, instructie, bis, result, final, action];
	};
};
