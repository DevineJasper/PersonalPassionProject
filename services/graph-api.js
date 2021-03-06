'use strict';

// Imports dependencies
const request = require('request'),
	camelCase = require('camelcase'),
	config = require('./config');

module.exports = class GraphAPI {
	static callSendAPI(requestBody) {
		console.log('dit is de requestBody in callSendAPI');
		console.log(requestBody);
		// Send the HTTP request to the Messenger Platform
		request(
			{
				uri: `${config.mPlatfom}/me/messages`,
				qs: {
					access_token: config.pageAccesToken
				},
				method: 'POST',
				json: requestBody
			},
			error => {
				if (error) {
					console.error('Unable to send message:', error);
				}
			}
		);
	}

	static callMessengerProfileAPI(requestBody) {
		// Send the HTTP request to the Messenger Profile API

		console.log(`Setting Messenger Profile for app ${config.appId}`);
		request(
			{
				uri: `${config.mPlatfom}/me/messenger_profile`,
				qs: {
					access_token: config.pageAccesToken
				},
				method: 'POST',
				json: requestBody
			},
			(error, _res, body) => {
				if (!error) {
					console.log('Request sent callmessengerProfile:', body);
				} else {
					console.error('Unable to send message:', error);
				}
			}
		);
	}

	static callSubscriptionsAPI(customFields) {
		// Send the HTTP request to the Subscriptions Edge to configure your webhook
		// You can use the Graph API's /{app-id}/subscriptions edge to configure and
		// manage your app's Webhooks product
		// https://developers.facebook.com/docs/graph-api/webhooks/subscriptions-edge
		console.log(
			`Setting app ${config.appId} callback url to ${config.webhookUrl}`
		);

		let fields =
			'messages, messaging_postbacks, messaging_optins, \
	    message_deliveries, messaging_referrals';

		if (customFields !== undefined) {
			fields = fields + ', ' + customFields;
		}

		console.log(fields);

		request(
			{
				uri: `${config.mPlatfom}/${config.appId}/subscriptions`,
				qs: {
					access_token: config.appId + '|' + config.appSecret,
					object: 'page',
					callback_url: config.webhookUrl,
					verify_token: config.verifyToken,
					fields: fields,
					include_values: 'true'
				},
				method: 'POST'
			},
			(error, _res, body) => {
				if (!error) {
					console.log('Request sent callsubscriptionsapi:', body);
				} else {
					console.error('Unable to send message:', error);
				}
			}
		);
	}

	static callSubscribedApps(customFields) {
		// Send the HTTP request to subscribe an app for Webhooks for Pages
		// You can use the Graph API's /{page-id}/subscribed_apps edge to configure
		// and manage your pages subscriptions
		// https://developers.facebook.com/docs/graph-api/reference/page/subscribed_apps
		console.log(`Subscribing app ${config.appId} to page ${config.pageId}`);

		let fields =
			'messages, messaging_postbacks, messaging_optins, \
	    message_deliveries, messaging_referrals';

		if (customFields !== undefined) {
			fields = fields + ', ' + customFields;
		}

		console.log(fields);

		request(
			{
				uri: `${config.mPlatfom}/${config.pageId}/subscribed_apps`,
				qs: {
					access_token: config.pageAccesToken,
					subscribed_fields: fields
				},
				method: 'POST'
			},
			error => {
				if (error) {
					console.error('Unable to send message:', error);
				}
			}
		);
	}

	static async getUserProfile(senderPsid) {
		try {
			const userProfile = await this.callUserProfileAPI(senderPsid);

			for (const key in userProfile) {
				const camelizedKey = camelCase(key);
				const value = userProfile[key];
				delete userProfile[key];
				userProfile[camelizedKey] = value;
			}

			return userProfile;
		} catch (err) {
			console.log('Fetch failed:', err);
		}
	}

	static callUserProfileAPI(senderPsid) {
		return new Promise((resolve, reject) => {
			let body = [];

			// Send the HTTP request to the Graph API
			request({
				uri: `${config.mPlatfom}/${senderPsid}`,
				qs: {
					access_token: config.pageAccesToken,
					fields: 'first_name, last_name'
				},
				method: 'GET'
			})
				.on('response', response => {
					// console.log(response.statusCode);

					if (response.statusCode !== 200) {
						reject(Error(response.statusCode));
					}
				})
				.on('data', chunk => {
					body.push(chunk);
				})
				.on('error', error => {
					console.error('Unable to fetch profile:' + error);
					reject(Error('Network Error'));
				})
				.on('end', () => {
					body = Buffer.concat(body).toString();
					// console.log(JSON.parse(body));

					resolve(JSON.parse(body));
				});
		});
	}

	static callFBAEventsAPI(senderPsid, eventName) {
		// Construct the message body
		let requestBody = {
			event: 'CUSTOM_APP_EVENTS',
			custom_events: JSON.stringify([
				{
					_eventName: 'postback_payload',
					_value: eventName,
					_origin: 'cinematjes'
				}
			]),
			advertiser_tracking_enabled: 0,
			application_tracking_enabled: 0,
			extinfo: JSON.stringify(['mb1']),
			page_id: config.pageId,
			page_scoped_user_id: senderPsid
		};

		// Send the HTTP request to the Activities API
		request(
			{
				uri: `${config.mPlatfom}/${config.appId}/activities`,
				method: 'POST',
				form: requestBody
			},
			error => {
				if (!error) {
					console.log(`FBA event '${eventName}'`);
				} else {
					console.error(`Unable to send FBA event '${eventName}':` + error);
				}
			}
		);
	}
};
