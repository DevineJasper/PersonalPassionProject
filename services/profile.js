'use strict';

// Imports dependencies
const GraphAPI = require('./graph-api'),
	config = require('./config');

module.exports = class Profile {
	setWebhook() {
		GraphAPI.callSubscriptionsAPI();
		GraphAPI.callSubscribedApps();
	}

	setThread() {
		let profilePayload = {
			...this.getGetStarted(),
			...this.getGreeting()
		};
		console.log('setThread function');
		GraphAPI.callMessengerProfileAPI(profilePayload);
	}

	setWhitelistedDomains() {
		let domainPayload = this.getWhitelistedDomains();
		console.log('setWhitelistedDomains function');
		GraphAPI.callMessengerProfileAPI(domainPayload);
	}

	getGetStarted() {
		return {
			get_started: {
				payload: 'GET_STARTED'
			}
		};
	}

	getGreeting() {
		return {
			greeting: [
				{
					locale: 'default',
					text:
						"Hallo {{user_first_name}} en welkom bij Cinematjes! Druk op de 'Aan de slag' knop om jouw filmavond te organiseren!"
				}
			]
		};
	}

	getWhitelistedDomains() {
		let whitelistedDomains = {
			whitelisted_domains: config.whitelistedDomains
		};

		console.log(whitelistedDomains);
		return whitelistedDomains;
	}
};
