const CinemaEventController = require('./controllers/CinemaEventController');
const AdminController = require('./controllers/AdminController');
const ParticipantsController = require('./controllers/ParticipantsController');

let dates;
let phase;

async function checkSetup() {
	dates = await CinemaEventController.getDates();
	console.log(dates);
	phase = await CinemaEventController.getEventPhase();
	console.log(`fase project: ${phase}`);
}

async function sendMessage(phase) {
	const allParticipants = await ParticipantsController.getUsers();
	console.log(allParticipants);
	allParticipants.forEach(async participant => {
		await AdminController.handlePayload('GET_STARTED', participant, phase, '');
	});
}

async function checkDateNow() {
	const today = new Date();
	console.log(today);
	switch (phase) {
		case 1:
			if (today > dates.startSuggesties) {
				console.log('verander naar suggestieronde');
				await CinemaEventController.setEventPhase(2);
				sendMessage(2);
			}
			break;
		case 2:
			if (today > dates.endSuggesties) {
				console.log('verander naar selectieronde');
				await CinemaEventController.setEventPhase(3);
				sendMessage(3);
			}
			break;
		case 3:
			if (today > dates.startStemming) {
				console.log('verander naar stemmingronde');
				await CinemaEventController.setEventPhase(4);
				sendMessage(4);
			}
			break;
		case 4:
			if (today > dates.endStemming) {
				console.log('verander naar finale ronde');
				await CinemaEventController.setEventPhase(5);
				sendMessage(5);
			}
			break;
		case 5:
			if (today > dates.filmAvond) {
				console.log('verander naar filmavond');
				await CinemaEventController.setEventPhase(6);
				sendMessage(6);
			}
			break;
	}
}

async function init() {
	await checkSetup();
	if (dates.startSuggesties == null) {
		console.log('dates not set');
		return;
	} else {
		checkDateNow();
	}
}

init();
