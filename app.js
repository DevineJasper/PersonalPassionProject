const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('./Database.js');
// const crypto = require('crypto');
// const Receive = require('./services/receive');
// const GraphAPi = require('./services/graph-api');
// const User = require('./services/user');
// const config = require('./services/config');
// const i18n = require('./i18n.config');
require('dotenv').config();

app.use(morgan('short'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(process.env.PORT, () => {
	console.log(`Server luistert op poort ${process.env.PORT}`);
});

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const db = new Database();

app.get('/', (req, res) => {
	res.render(__dirname + '/views/index');
});

app.get('/api/test', async (req, res) => {
	const tests = await db.getAll();
	await console.log(tests);
	res.json(tests);
});

app.post('/api/test', async (req, res) => {
	const test = await {
		id: req.body.id,
		phase: req.body.phase,
		name: req.body.name
	};
	await db.setAll(test);
	res.status(201).json({
		message: 'post test...',
		test: test
	});
});

// -------------------------------------------------------- //
// -------------------------------------------------------- //
// ----------------------- CHATBOT ------------------------ //
// -------------------------------------------------------- //
// -------------------------------------------------------- //

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
	// Your verify token. Should be a random string.
	let VERIFY_TOKEN = 'test';

	// Parse the query params
	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	let challenge = req.query['hub.challenge'];

	// Checks if a token and mode is in the query string of the request
	if (mode && token) {
		// Checks the mode and token sent is correct
		if (mode === 'subscribe' && token === VERIFY_TOKEN) {
			// Responds with the challenge token from the request
			console.log('WEBHOOK_VERIFIED');
			res.status(200).send(challenge);
		} else {
			// Responds with '403 Forbidden' if verify tokens do not match
			res.sendStatus(403);
		}
	}
});

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {
	let body = req.body;

	// Checks this is an event from a page subscription
	if (body.object === 'page') {
		// Iterates over each entry - there may be multiple if batched
		body.entry.forEach(function(entry) {
			// Gets the message. entry.messaging is an array, but
			// will only ever contain one message, so we get index 0
			let webhook_event = entry.messaging[0];
			console.log(webhook_event);

			// Get the sender PSID
			let sender_psid = webhook_event.sender.id;
			console.log('Sender PSID: ' + sender_psid);
		});

		// Returns a '200 OK' response to all requests
		res.status(200).send('EVENT_RECEIVED');
	} else {
		// Returns a '404 Not Found' if event is not from a page subscription
		res.sendStatus(404);
	}
});

// Handles messages events
handleMessage = (sender_psid, received_message) => {};

// Handles messaging_postbacks events
handlePostback = (sender_psid, received_postback) => {};

// Sends response messages via the Send API
callSendAPI = (sender_psid, response) => {};
