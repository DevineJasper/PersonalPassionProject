'use strict';

// Imports dependencies
const GraphAPI = require('./graph-api'),
	config = require('./config');

module.exports = class Profile {
	setWebhook() {
		GraphAPI.callSubscriptionsAPI();
		GraphAPI.callSubscribedApps();
	}

	// setPageFeedWebhook() {
	// 	GraphAPI.callSubscriptionsAPI('feed');
	// 	GraphAPI.callSubscribedApps('feed');
	// }

	setThread() {
		let profilePayload = {
			...this.getGetStarted(),
			...this.getGreeting()
			// ...this.getPersistentMenu()
		};
		console.log('setThread function');
		GraphAPI.callMessengerProfileAPI(profilePayload);
	}

	// setPersonas() {
	// 	let newPersonas = config.newPersonas;

	// 	GraphAPI.getPersonaAPI()
	// 		.then(personas => {
	// 			for (let persona of personas) {
	// 				config.pushPersona({
	// 					name: persona.name,
	// 					id: persona.id
	// 				});
	// 			}
	// 			console.log(config.personas);
	// 			return config.personas;
	// 		})
	// 		.then(existingPersonas => {
	// 			for (let persona of newPersonas) {
	// 				if (!(persona.name in existingPersonas)) {
	// 					GraphAPI.postPersonaAPI(persona.name, persona.picture)
	// 						.then(personaId => {
	// 							config.pushPersona({
	// 								name: persona.name,
	// 								id: personaId
	// 							});
	// 							console.log(config.personas);
	// 						})
	// 						.catch(error => {
	// 							console.log('Creation failed:', error);
	// 						});
	// 				} else {
	// 					console.log('Persona already exists for name:', persona.name);
	// 				}
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.log('Creation failed:', error);
	// 		});
	// }

	// setGetStarted() {
	// 	let getStartedPayload = this.getGetStarted();
	// 	GraphAPI.callMessengerProfileAPI(getStartedPayload);
	// }

	// setGreeting() {
	// 	let greetingPayload = this.getGreeting();
	// 	console.log('setGreeting function');
	// 	GraphAPI.callMessengerProfileAPI(greetingPayload);
	// }

	// setPersistentMenu() {
	// 	let menuPayload = this.getPersistentMenu();
	// 	console.log('setPersistentMenu function');
	// 	GraphAPI.callMessengerProfileAPI(menuPayload);
	// }

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

	// getPersistentMenu() {
	// 	let menuItems = [];

	// 	for (let locale of locales) {
	// 		menuItems.push(this.getMenuItems(locale));
	// 	}

	// 	return {
	// 		persistent_menu: menuItems
	// 	};
	// }

	// getMenuItems(locale) {
	// 	let param = locale === 'en_US' ? 'default' : locale;

	// 	i18n.setLocale(locale);

	// 	let localizedMenu = {
	// 		locale: param,
	// 		composer_input_disabled: false,
	// 		call_to_actions: [
	// 			{
	// 				title: i18n.__('menu.support'),
	// 				type: 'nested',
	// 				call_to_actions: [
	// 					{
	// 						title: i18n.__('menu.order'),
	// 						type: 'postback',
	// 						payload: 'TRACK_ORDER'
	// 					},
	// 					{
	// 						title: i18n.__('menu.help'),
	// 						type: 'postback',
	// 						payload: 'CARE_HELP'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				title: i18n.__('menu.suggestion'),
	// 				type: 'postback',
	// 				payload: 'CURATION'
	// 			},
	// 			{
	// 				type: 'web_url',
	// 				title: i18n.__('menu.shop'),
	// 				url: config.shopUrl,
	// 				webview_height_ratio: 'compact'
	// 			}
	// 		]
	// 	};

	// 	console.log(localizedMenu);
	// 	return localizedMenu;
	// }

	getWhitelistedDomains() {
		let whitelistedDomains = {
			whitelisted_domains: config.whitelistedDomains
		};

		console.log(whitelistedDomains);
		return whitelistedDomains;
	}
};
