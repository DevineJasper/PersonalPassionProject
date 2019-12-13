const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
//database connection
const compression = require('compression');
const fetch = require('node-fetch');
const ejsLint = require('ejs-lint');
//Controllers
const CinemaEventController = require('./controllers/CinemaEventController');
const ParticipantsController = require('./controllers/ParticipantsController');
const SuggestionsController = require('./controllers/SuggestionsController');
const StemmingController = require('./controllers/StemmingController');
const AdminController = require('./controllers/AdminController');

app.use(cors());
app.use(compression());
app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

let projectPhase;
let images;

app.get('/', (req, res) => {
	res.render(__dirname + '/views/index', { url: config.appUrl });
});

app.get('/privacy', (req, res) => {
	res.render(__dirname + '/views/privacy');
});

app.get('/admin', async (req, res) => {
	let movies = [];
	let counter = 0;
	let datums = [];
	let movieSuggestions;
	let drinkSuggestions;
	let snackSuggestions;
	let stemmingMovies;
	const render = () => {
		console.log('renderen functie');
		res.render(__dirname + '/views/admin', {
			url: config.appUrl,
			projectFase: projectPhase,
			suggestions_movie: movies,
			suggestions_drink: drinkSuggestions,
			suggestions_snack: snackSuggestions,
			stemming_movies: stemmingMovies,
			dates: datums
		});
	};
	datums = await CinemaEventController.getDates();
	movieSuggestions = await SuggestionsController.getAllMovieSuggestions();
	drinkSuggestions = await SuggestionsController.getAllDrinkSuggestions();
	snackSuggestions = await SuggestionsController.getAllSnackSuggestions();
	stemmingMovies = await StemmingController.getVotes();
	console.log(movieSuggestions.length);
	if (movieSuggestions.length !== 0) {
		movieSuggestions.forEach(async suggestion => {
			try {
				await fetch(
					`https://api.themoviedb.org/3/movie/${suggestion.movieId}?api_key=a108ea578de94e9156c38073bbd89613&language=en-En`
				)
					.then(r => r.json())
					.then(data => {
						movies.push(data);
						counter++;
						if (counter === movieSuggestions.length) {
							render();
						}
					});
			} catch (error) {
				res.status(500).send({ message: 'fetch error', error });
			}
		});
	} else {
		render();
	}
});

// app.get('/suggesties/films', (req, res) => {
// 	res.render(__dirname + '/views/suggesties/films', { url: config.appUrl });
// });

// app.get('/suggesties/snacks', (req, res) => {
// 	res.render(__dirname + '/views/suggesties/snacks', { url: config.appUrl });
// });

// app.get('/suggesties/drinks', (req, res) => {
// 	res.render(__dirname + '/views/suggesties/drinks', { url: config.appUrl });
// });

// app.get('/suggesties/themas', (req, res) => {
// 	res.render(__dirname + '/views/suggesties/themas', { url: config.appUrl });
// });

// app.get('/stemming/films', (req, res) => {
// 	res.render(__dirname + '/views/stemming/films', { url: config.appUrl });
// });

// app.get('/stemming/drinks', (req, res) => {
// 	res.render(__dirname + '/views/stemming/drinks', { url: config.appUrl });
// });

// app.get('/stemming/snacks', (req, res) => {
// 	res.render(__dirname + '/views/stemming/snacks', { url: config.appUrl });
// });

// app.get('/stemming/themas', (req, res) => {
// 	res.render(__dirname + '/views/stemming/themas', { url: config.appUrl });
// });

app.put('/api/cinemaEvent/phase', (req, res) => {
	// console.log(req.body.eventPhase);
	projectPhase = req.body.eventPhase;
	CinemaEventController.setEventPhase(projectPhase);
	res.status(201).json(projectPhase);
});

// app.get('/cinemaEvent/phase', async (req, res) => {
// 	projectPhase = await CinemaEventController.getEventPhase();
// 	res.json(projectPhase);
// });

app.get('/api/cinemaEvent/dates', async (req, res) => {
	const dates = await CinemaEventController.Dates();
	res.json(dates);
});

app.put('/api/cinemaEvent/dates', async (req, res) => {
	CinemaEventController.updateDates(req.body);
	res.json('dates aangepast!');
});

// app.post('/admin/push', (req, res) => {
// 	const recipients = req.body.recipients;
// 	const payload = req.body.payload;
// 	const phase = req.body.phase;
// 	recipients.forEach(recipient => {
// 		AdminController.handlePayload(payload, recipient, phase);
// 	});
// 	res.json({
// 		message: 'Goed gepost!'
// 	});
// });

// app.get('/participants', async (req, res) => {
// 	const participants = await ParticipantsController.getUsers();
// 	res.json(participants);
// });

// app.get('/participants/vrijwilligers', async (req, res) => {
// 	const vrijwilligers = await ParticipantsController.getVolunteers();
// 	res.json(vrijwilligers);
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

let participants = [];

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
			// console.log('WEBHOOK_VERIFIED');
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
			// console.log('!!!!!!!!!!!!!!! DIT IS HET WEBHOOKEVENT IN DE APP.POST:');
			// console.log(webhookEvent);

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

			if (!(senderPsid in participants)) {
				console.log(`we got a new user: ${senderPsid}`);
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
						participants[senderPsid] = user;
						ParticipantsController.setUser(user);
						// console.log('New Profile PSID:', senderPsid);
						let receiveMessage = new Receive(
							participants[senderPsid],
							webhookEvent,
							projectPhase
						);
						return receiveMessage.handleMessage();
					});
			} else {
				console.log('Profile already exists PSID:', senderPsid);
				let receiveMessage = new Receive(
					participants[senderPsid],
					webhookEvent,
					projectPhase
				);
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
			// if (mode == 'nlp' || mode == 'all') {
			// 	GraphAPI.callNLPConfigsAPI();
			// 	res.write(`<p>Enable Built-in NLP for Page ${config.pageId}</p>`);
			// }
			if (mode == 'domains' || mode == 'all') {
				Profile.setWhitelistedDomains();
				res.write(`<p>Whitelisting domains: ${config.whitelistedDomains}</p>`);
			}
			// if (mode == 'private-reply') {
			// 	Profile.setPageFeedWebhook();
			// 	res.write(`<p>Set Page Feed Webhook for Private Replies.</p>`);
			// }
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
const listener = app.listen(config.port, async () => {
	users = await ParticipantsController.getUsers();
	users.forEach(participant => {
		const profile = {
			firstName: participant.firstName,
			lastName: participant.lastName,
			phase: participant.fase,
			volunteer: participant.vrijwilliger
		};
		let user = new User(participant.psid);
		user.setProfile(profile);
		participants[user.psid] = user;
	});
	projectPhase = await CinemaEventController.getEventPhase();
	console.log(`project is in fase ${projectPhase}`);
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

require('./routes/suggestieRoutes.js')(app);
require('./routes/stemmingRoutes.js')(app);
require('./routes/selectieRoutes.js')(app);
// require('./routes/cinemaEvent.routes.js')(app);
require('./routes/adminRoutes.js')(app);
require('./routes/participantRoutes.js')(app);
