/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

'use strict';

const /* Curation = require('./curation'), */
	// Order = require('./order'),
	Response = require('./response'),
	// Care = require("./care"),
	// Survey = require("./survey"),
	Suggestie = require('./suggestie'),
	GraphAPI = require('./graph-api'),
	config = require('./config');

module.exports = class Receive {
	constructor(user, webhookEvent) {
		this.user = user;
		this.webhookEvent = webhookEvent;
	}

	// Check if the event is a message or postback and
	// call the appropriate handler function
	handleMessage() {
		console.log('in de handleMessag() functie');
		console.log(this.webhookEvent);
		let event = this.webhookEvent;

		let responses;

		try {
			if (event.message) {
				let message = event.message;

				if (message.quick_reply) {
					console.log('QUICK REPLY GEDETECTEERD!');
					responses = this.handleQuickReply();
				} else if (message.attachments) {
					responses = this.handleAttachmentMessage();
				} else if (message.text) {
					responses = this.handleTextMessage();
				}
			} else if (event.postback) {
				console.log('POSTBACK EVENT ONTVANGEN IN HANDLEMESSAGE:');
				console.log(event.postback);
				responses = this.handlePostback();
			}
		} catch (error) {
			console.error(error);
			responses = {
				text: `An error has occured: '${error}'. We have been notified and \
        will fix the issue shortly!`
			};
		}
		console.log('RESPONSES GEMAAKT IN HANDLEMESSAGE:');
		console.log(responses);

		if (Array.isArray(responses)) {
			let delay = 0;
			for (let response of responses) {
				this.sendMessage(response, delay * 2000);
				delay++;
			}
		} else {
			this.sendMessage(responses);
		}
	}

	// Handles messages events with text
	handleTextMessage() {
		// console.log(
		// 	'Received text:',
		// 	`${this.webhookEvent.message.text} for ${this.user.psid}`
		// );
		let message = this.webhookEvent.message.text.trim().toLowerCase();

		let response;
		console.log('DIT IS DE MESSAGE IN HANDLETEXTMESSAGE');
		console.log(message);

		if (message.includes('rs')) {
			response = Response.genNuxMessage(this.user);
		} else {
			response = Response.genNuxMessage(this.user);
		}

		return response;
	}

	// Handles mesage events with attachments
	handleAttachmentMessage() {
		let response;

		// Get the attachment
		let attachment = this.webhookEvent.message.attachments[0];
		// console.log('Received attachment:', `${attachment} for ${this.user.psid}`);

		response = {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'generic',
					elements: [
						{
							title: 'Is this the right picture?',
							subtitle: 'Tap a button to answer.',
							image_url: attachment.payload.url,
							buttons: [
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
						}
					]
				}
			}
		};

		return response;
	}

	// Handles mesage events with quick replies
	handleQuickReply() {
		// Get the payload of the quick reply
		let payload = this.webhookEvent.message.quick_reply.payload;

		return this.handlePayload(payload);
	}

	// Handles postbacks events
	handlePostback() {
		let postback = this.webhookEvent.postback;
		// Check for the special Get Starded with referral
		let payload;
		if (postback.referral && postback.referral.type == 'OPEN_THREAD') {
			console.log('postback heeft WEL een referral');
			payload = postback.referral.ref;
		} else {
			// Get the payload of the postback
			console.log('postback heeft geen referral');
			payload = postback.payload;
		}
		return this.handlePayload(payload.toUpperCase());
	}

	// Handles referral events
	handleReferral() {
		// Get the payload of the postback
		let payload = this.webhookEvent.referral.ref.toUpperCase();

		return this.handlePayload(payload);
	}

	handlePayload(payload) {
		// console.log('Received Payload:', `${payload} for ${this.user.psid}`);

		// Log CTA event in FBA
		GraphAPI.callFBAEventsAPI(this.user.psid, payload);

		let response;

		// Set the response based on the payload
		if (
			payload === 'GET_STARTED' ||
			payload === 'DEVDOCS' ||
			payload === 'GITHUB'
		) {
			response = Response.genNuxMessage(this.user);
		} else if (payload.includes('CURATION') || payload.includes('COUPON')) {
			let curation = new Curation(this.user, this.webhookEvent);
			response = curation.handlePayload(payload);
		} else if (payload.includes('CARE')) {
			let care = new Care(this.user, this.webhookEvent);
			response = care.handlePayload(payload);
		} else if (payload.includes('ORDER')) {
			response = Order.handlePayload(payload);
		} else if (payload.includes('CSAT')) {
			response = Survey.handlePayload(payload);
		} else if (payload.includes('CHAT-PLUGIN')) {
			response = [
				Response.genText(i18n.__('chat_plugin.prompt')),
				Response.genText(i18n.__('get_started.guidance')),
				Response.genQuickReply(i18n.__('get_started.help'), [
					{
						title: i18n.__('care.order'),
						payload: 'CARE_ORDER'
					},
					{
						title: i18n.__('care.billing'),
						payload: 'CARE_BILLING'
					},
					{
						title: i18n.__('care.other'),
						payload: 'CARE_OTHER'
					}
				])
			];
		} else if (payload.includes('SUGGESTIE')) {
			console.log('payload includes SUGGESTIES');
			let suggestie = new Suggestie(this.user, this.webhookevent);
			response = suggestie.handlePayload(payload);
		}

		return response;
	}

	handlePrivateReply(type, object_id) {
		let welcomeMessage =
			i18n.__('get_started.welcome') +
			' ' +
			i18n.__('get_started.guidance') +
			'. ' +
			i18n.__('get_started.help');

		let response = Response.genQuickReply(welcomeMessage, [
			{
				title: i18n.__('menu.suggestion'),
				payload: 'CURATION'
			},
			{
				title: i18n.__('menu.help'),
				payload: 'CARE_HELP'
			}
		]);

		let requestBody = {
			recipient: {
				[type]: object_id
			},
			message: response
		};

		GraphAPi.callSendAPI(requestBody);
	}

	sendMessage(response, delay = 0) {
		console.log(`RESPONSE IN SENDMESSAGE ONTVANGEN:`);
		console.log(response);
		// Check if there is delay in the response
		if ('delay' in response) {
			delay = response['delay'];
			delete response['delay'];
		}

		// Construct the message body
		let requestBody = {
			recipient: {
				id: this.user.psid
			},
			message: response
		};
		setTimeout(() => GraphAPI.callSendAPI(requestBody), delay);
	}
};
