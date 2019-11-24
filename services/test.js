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

		switch (payload) {
			case 'NO':
				response = [
					Response.genText(text),
					Response.genGenericTemplate(
						`${config.appUrl}/coupon.png`,
						"That's a no, right?",
						'You crazy bugga',
						[
							{
								type: 'postback',
								title: 'Yes!',
								payload: 'yes'
							},
							{
								type: 'postback',
								title: 'No!',
								payload: 'no'
							}
						]
					)
				];
				break;
		}

		return response;
	};
};
