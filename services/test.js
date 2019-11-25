'use strict';

// Imports dependencies
const Response = require('./response'),
	config = require('./config');

module.exports = class Test {
	constructor(user, webhookEvent) {
		this.user = user;
		this.webhookEvent = webhookEvent;
	}

	handlePayload = payload => {
		let response;

		const text = `${this.user.firstName}, you pressed a button!`;
		const webButton = Response.genWebUrlButton('webview', config.siteUrl);

		switch (payload) {
			case 'TEST':
				response = Response.genGenericTemplate(
					`${config.appUrl}/coupon.png`,
					'Test webview button',
					'You crazy bugga',
					[
						webButton,
						{
							type: 'postback',
							title: 'No!',
							payload: 'no'
						}
					]
				);
				break;
		}

		return response;
	};
};
