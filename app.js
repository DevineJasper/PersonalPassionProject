const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const compression = require('compression');
const fetch = require('node-fetch');
//Controllers
const CinemaEventController = require('./controllers/CinemaEventController');
const ParticipantsController = require('./controllers/ParticipantsController');
const SuggestionsController = require('./controllers/SuggestionsController');
const StemmingController = require('./controllers/StemmingController');

app.use(cors());
app.use(compression());
app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

let projectPhase;

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
	let movieSuggestions = [];
	let drinkSuggestions = [];
	let snackSuggestions = [];
	let stemmingMovies = [];
	let highestVotes;
	let volunteers = [];
	let currentPhase;

	// Admin Application
	const render = () => {
		console.log('renderen functie');
		res.render(__dirname + '/views/admin', {
			url: config.appUrl,
			projectFase: projectPhase,
			suggestions_movie: movies,
			suggestions_drink: drinkSuggestions,
			suggestions_snack: snackSuggestions,
			stemming_movies: stemmingMovies,
			dates: datums,
			highest_votes: highestVotes,
			vrijwilligers: volunteers
		});
	};
	datums = await CinemaEventController.getDates();
	currentPhase = await CinemaEventController.getEventPhase();
	projectPhase = currentPhase;
	movieSuggestions = await SuggestionsController.getAllMovieSuggestions();
	drinkSuggestions = await SuggestionsController.getAllDrinkSuggestions();
	snackSuggestions = await SuggestionsController.getAllSnackSuggestions();
	stemmingMovies = await StemmingController.getVotes();
	highestVotes = await StemmingController.getHighestVotes(stemmingMovies);
	volunteers = await ParticipantsController.getVolunteers();
	console.log(highestVotes);
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

// CinemaEvent routes

app.put('/api/cinemaEvent/phase', (req, res) => {
	projectPhase = req.body.eventPhase;
	CinemaEventController.setEventPhase(projectPhase);
	res.status(201).json(projectPhase);
});


app.get('/api/cinemaEvent/dates', async (req, res) => {
	const dates = await CinemaEventController.Dates();
	res.json(dates);
});

app.put('/api/cinemaEvent/dates', async (req, res) => {
	CinemaEventController.updateDates(req.body);
	res.json('dates aangepast!');
});

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
			if (mode == 'domains' || mode == 'all') {
				Profile.setWhitelistedDomains();
				res.write(`<p>Whitelisting domains: ${config.whitelistedDomains}</p>`);
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
require('./routes/adminRoutes.js')(app);
require('./routes/finalRoutes.js')(app);
require('./routes/participantRoutes.js')(app);
