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
					`${config.siteUrl}/stemming/${this.user.psid}`
				);
				response = Response.genGenericTemplate(
					`${config.appUrl}/assets/images/film.png`,
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
			case 'STEMMING_TERUG':
				const fase = Response.genText(
					'🤖 Je kan momenteel stemmen op jouw favoriete 📽film. 🤖'
				);
				const doen = Response.genQuickReply('Wat wil je doen?', [
					{
						title: 'Info',
						payload: 'STEMMING_INFO'
					},
					{
						title: 'Stemmen op 📽film',
						payload: 'STEMMING_FILM'
					}
				]);
				response = [fase, doen];
				break;
			case 'STEMMING_INFO':
				let filmavond = Response.genText(
					'De filmavond gaat door op <datum>.'
				);
				let stemronde = Response.genText('Je kan stemmen op jouw favoriet tot <datum>')
				let helpen = Response.genQuickReply(
					'We zoeken altijd naar enthousiaste vrijwilligers om te helpen bij de organisatie van de filmavond :D',
					[
						{
							title: '💪🏻 Ik wil helpen',
							payload: 'STEMMING_HELPEN'
						},
						{
							title: '◀️ Terug',
							payload: 'STEMMING_TERUG'
						}
					]
				);
				response = [filmavond, stemronde, helpen];
				break;
		}

		return response;
	};

	genFirstResponse = () => {
		let hello = Response.genText(`⚬ ☼☱☴☼ BEEP ☼☵☷☵☼ BOOP ☼☴☱☼ ⚬`);
		let belangrijk = Response.genText('🤖 BELANGRIJK BERICHT 🤖')
		let instructie = Response.genText(
			'‼️ Vanaf nu kan jij stemmen op jouw favoriet uit onze selectie! ‼️'
		);
		let bis = Response.genText('🔥 NU WORDT HET WEL ECHT SPANNEND 🔥');
		let action = Response.genQuickReply('🤖 Waarop wil je stemmen? 🤖', [
			{
				title: 'Stemmen op 📽film',
				payload: 'STEMMING_FILM'
			}
		]);
		return [hello, belangrijk, instructie, bis, action];
	};
};
