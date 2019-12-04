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
	Stemming = require('./stemming'),
	Final = require('./final'),
	GraphAPI = require('./graph-api'),
	User = require('./user'),
	// ParticipantsController = require('../controllers/ParticipantsController'),
	config = require('./config');

module.exports = class Receive {
	constructor(user, webhookEvent, projectPhase) {
		this.user = user;
		this.webhookEvent = webhookEvent;
		this.projectPhase = projectPhase;
	}

	// Check if the event is a message or postback and
	// call the appropriate handler function
	handleMessage() {
		let event = this.webhookEvent;

		let responses;

		try {
			if (event.message) {
				let message = event.message;
				if (message.quick_reply) {
					responses = this.handleQuickReply();
				} else if (message.attachments) {
					responses = this.handleAttachmentMessage();
				} else if (message.text) {
					responses = this.handleTextMessage();
				}
			} else if (event.postback) {
				responses = this.handlePostback();
			}
		} catch (error) {
			console.error(error);
			responses = {
				text: `An error has occured: '${error}'. We have been notified and \
        will fix the issue shortly!`
			};
		}

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
		console.log(message);

		if (message.includes('hey' || 'hallo' || 'hi' || 'yeet')) {
			response = Response.genText('Hey ;)');
		} else {
			if (this.projectPhase === 1) {
				let suggestie = new Suggestie(this.user, this.webhookevent);
				response = suggestie.genFirstSuggestie(this.user);
			} else if (this.projectPhase === 2) {
				let stemming = new Stemming(this.user, this.webhookevent);
				response = stemming.genFirstStemming(this.user);
			} else if (this.projectPhase === 3) {
				let final = new Final(this.user, this.webhookevent);
				respone = final.genFirstFinal(this.user);
			}
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
		if (payload === 'GET_STARTED') {
			if (this.projectPhase === 1) {
				let suggestie = new Suggestie(this.user, this.webhookevent);
				response = suggestie.genFirstSuggestie(this.user);
			} else if (this.projectPhase === 2) {
				let stemming = new Stemming(this.user, this.webhookevent);
				response = stemming.genFirstStemming(this.user);
			} else if (this.projectPhase === 3) {
				let final = new Final(this.user, this.webhookevent);
				respone = final.genFirstFinal(this.user);
			}
		} else if (payload.includes('SUGGESTIE')) {
			let suggestie = new Suggestie(this.user, this.webhookevent);
			response = suggestie.handlePayload(payload);
		} else if (payload.includes('STEMMING')) {
			let stemming = new Stemming(this.user, this.webhookevent);
			response = stemming.handlePayload(payload);
		}

		return response;
	}

	sendMessage(response, delay = 0) {
		// console.log(`RESPONSE IN SENDMESSAGE ONTVANGEN:`);
		// console.log(response);
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

	handlePushPayload = payload => {
		let responses;

		switch (payload) {
			case 'GET_STARTED':
				if (this.projectPhase === 1) {
					console.log('we willen naar fase 1');
					let suggestie = new Suggestie(this.user, null);
					responses = suggestie.genFirstSuggestie();
				} else if (this.projectPhase === 2) {
					let stemming = new Stemming(this.user, null);
					responses = stemming.genFirstStemming();
				} else if (this.projectPhase === 3) {
					let final = new Final(this.user, null);
					responses = final.genFirstFinal();
				}
				break;
			case 'REMINDER':
				responses = Response.genText('Héla, blijf es van mijn knoppen');
				break;
		}

		if (Array.isArray(responses)) {
			console.log('tis een array');
			let delay = 0;
			for (let response of responses) {
				this.sendMessage(response, delay * 2000);
				delay++;
			}
		} else {
			this.sendMessage(responses);
		}
	};
};
