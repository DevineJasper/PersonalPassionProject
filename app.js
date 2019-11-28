const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(morgan('short'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.get('/', (req, res) => {
	res.render(__dirname + '/views/index');
});

app.get('/admin', (req, res) => {
	res.render(__dirname + '/views/admin');
});

// app.get('/api/test', async (req, res) => {
// 	const tests = await db.getAll();
// 	await console.log(tests);
// 	res.json(tests);
// });

// app.post('/api/test', async (req, res) => {
// 	const test = await {
// 		id: '',
// 		psId: req.body.psId,
// 		movieId: req.body.movieId
// 	};
// 	await db.setAll(test);
// 	res.status(201).json({
// 		message: 'post test...',
// 		entry: test
// 	});
// });

// -------------------------------------------------------- //
// -------------------------------------------------------- //
// ----------------------- CHATBOT ------------------------ //
// -------------------------------------------------------- //
// -------------------------------------------------------- //

const GraphAPI = require('./services/graph-api');
const User = require('./services/user');
const Receive = require('./services/receive');
const config = require('./services/config');

let users = [];

app.use(bodyParser.json({ verify: verifyRequestSignature }));

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
	// Parse the query params
	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	let challenge = req.query['hub.challenge'];

	// Checks if a token and mode is in the query string of the request
	if (mode && token) {
		// Checks the mode and token sent is correct
		if (mode === 'subscribe' && token === config.verifyToken) {
			// Responds with the challenge token from the request
			console.log('WEBHOOK_VERIFIED');
			res.status(200).send(challenge);
		} else {
			// Responds with '403 Forbidden' if verify tokens do not match
			console.log('verify tokens zit een fout');
			res.sendStatus(403);
		}
	}
});

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {
	// Parse the request body from the POST
	let body = req.body;
	console.log('DEZE BODY MOET IK ZENDEN VIA FETCH');
	console.log(body);

	// Check the webhook event is from a Page subscription
	if (body.object === 'page') {
		// Iterate over each entry - there may be multiple if batched
		body.entry.forEach(entry => {
			// Get the webhook event. entry.messaging is an array, but
			// will only ever contain one event, so we get index 0
			let webhookEvent = entry.messaging[0];
			console.log('!!!!!!!!!!!!!!! DIT IS HET WEBHOOKEVENT IN DE APP.POST:');
			console.log(webhookEvent);

			// Get the sender PSID
			let senderPsid = webhookEvent.sender.id;
			// console.log('Sender PSID: ' + senderPsid);

			// Discard uninteresting events
			if ('read' in webhookEvent) {
				// console.log("Got a read event");
				return;
			}

			if ('delivery' in webhookEvent) {
				// console.log("Got a delivery event");
				return;
			}

			if (!(senderPsid in users)) {
				let user = new User(senderPsid);

				GraphAPI.getUserProfile(senderPsid)
					.then(userProfile => {
						user.setProfile(userProfile);
					})
					.catch(error => {
						// The profile is unavailable
						console.log('Profile is unavailable:', error);
					})
					.finally(() => {
						users[senderPsid] = user;
						// console.log('New Profile PSID:', senderPsid);
						let receiveMessage = new Receive(users[senderPsid], webhookEvent);
						return receiveMessage.handleMessage();
					});
			} else {
				// console.log('Profile already exists PSID:', senderPsid);
				let receiveMessage = new Receive(users[senderPsid], webhookEvent);
				return receiveMessage.handleMessage();
			}
		});

		// Return a '200 OK' response to all events
		res.status(200).send('EVENT_RECEIVED');
	} else {
		// Return a '404 Not Found' if event is not from a page subscription
		res.sendStatus(404);
	}
});

// Set up your App's Messenger Profile
app.get('/profile', (req, res) => {
	let token = req.query['verify_token'];
	let mode = req.query['mode'];

	if (!config.webhookUrl.startsWith('https://')) {
		res.status(200).send('ERROR - Need a proper API_URL in the .env file');
	}
	let Profile = require('./services/profile.js');
	Profile = new Profile();

	// Checks if a token and mode is in the query string of the request
	if (mode && token) {
		if (token === config.verifyToken) {
			if (mode == 'webhook' || mode == 'all') {
				Profile.setWebhook();
				res.write(
					`<p>Set app ${config.appId} call to ${config.webhookUrl}</p>`
				);
			}
			if (mode == 'profile' || mode == 'all') {
				Profile.setThread();
				res.write(`<p>Set Messenger Profile of Page ${config.pageId}</p>`);
			}
			// if (mode == 'personas' || mode == 'all') {
			// 	Profile.setPersonas();
			// 	res.write(`<p>Set Personas for ${config.appId}</p>`);
			// 	res.write(
			// 		'<p>To persist the personas, add the following variables \
			//     to your environment variables:</p>'
			// 	);
			// 	res.write('<ul>');
			// 	res.write(`<li>PERSONA_BILLING = ${config.personaBilling.id}</li>`);
			// 	res.write(`<li>PERSONA_CARE = ${config.personaCare.id}</li>`);
			// 	res.write(`<li>PERSONA_ORDER = ${config.personaOrder.id}</li>`);
			// 	res.write(`<li>PERSONA_SALES = ${config.personaSales.id}</li>`);
			// 	res.write('</ul>');
			// }
			if (mode == 'nlp' || mode == 'all') {
				GraphAPI.callNLPConfigsAPI();
				res.write(`<p>Enable Built-in NLP for Page ${config.pageId}</p>`);
			}
			if (mode == 'domains' || mode == 'all') {
				Profile.setWhitelistedDomains();
				res.write(`<p>Whitelisting domains: ${config.whitelistedDomains}</p>`);
			}
			if (mode == 'private-reply') {
				Profile.setPageFeedWebhook();
				res.write(`<p>Set Page Feed Webhook for Private Replies.</p>`);
			}
			res.status(200).end();
		} else {
			// Responds with '403 Forbidden' if verify tokens do not match
			res.sendStatus(403);
		}
	} else {
		// Returns a '404 Not Found' if mode or token are missing
		res.sendStatus(404);
	}
});

// Verify that the callback came from Facebook.
function verifyRequestSignature(req, res, buf) {
	var signature = req.headers['x-hub-signature'];

	if (!signature) {
		console.log("Couldn't validate the signature.");
	} else {
		var elements = signature.split('=');
		var signatureHash = elements[1];
		var expectedHash = crypto
			.createHmac('sha1', config.appSecret)
			.update(buf)
			.digest('hex');
		if (signatureHash != expectedHash) {
			throw new Error("Couldn't validate the request signature.");
		}
	}
}

// Check if all environment variables are set
config.checkEnvVariables();

// listen for requests :)
const listener = app.listen(config.port, () => {
	console.log('Your app is listening on port ' + listener.address().port);

	if (
		Object.keys(config.personas).length == 0 &&
		config.appUrl &&
		config.verifyToken
	) {
		console.log(
			'Is this the first time running?\n' +
				'Make sure to set the both the Messenger profile, persona ' +
				'and webhook by visiting:\n' +
				config.appUrl +
				'/profile?mode=all&verify_token=' +
				config.verifyToken
		);
	}

	if (config.pageId) {
		console.log('Test your app by messaging:');
		console.log('https://m.me/' + config.pageId);
	}
});

require('./routes/suggestions.routes.js')(app);
