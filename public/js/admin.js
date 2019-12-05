console.log('hey admin');
const url = document.querySelector('.url').innerHTML;
let currentPhase;
let vrijwilligers = [];
let movieSuggestions = [];

// Event Handlers //

const handlePlanningClick = () => {
	renderContent('planning');
};

const handleBerichtenClick = () => {
	renderContent('berichten');
};

const handleInzendingenClick = async () => {
	await getMovieSuggestions();
	renderContent('inzendingen');
};

const handleVrijwilligersClick = () => {
	renderContent('vrijwilligers');
};

const handleResetClick = async () => {
	currentPhase = 0;
	const eventBody = {
		eventPhase: currentPhase
	};
	const pushMessage = {
		payload: 'GET_STARTED',
		phase: currentPhase
	};
	updateEventPhase(eventBody);
	postMessage(pushMessage);
};

const handlePlusClick = async () => {
	currentPhase++;
	const eventBody = {
		eventPhase: currentPhase
	};
	const pushMessage = {
		payload: 'GET_STARTED',
		phase: currentPhase
	};
	updateEventPhase(eventBody);
	postMessage(pushMessage);
};

const handleMinClick = async () => {
	currentPhase--;
	const eventBody = {
		eventPhase: currentPhase
	};
	const pushMessage = {
		payload: 'GET_STARTED',
		phase: currentPhase
	};
	updateEventPhase(eventBody);
	postMessage(pushMessage);
};

//API actions

const fetchVrijwilligers = async () => {
	await get(`${url}/participants/vrijwilligers`).then(r => {
		r.forEach(volunteer => {
			vrijwilligers.push(volunteer);
		});
	});
	renderVrijwilligers();
};

const getMovieSuggestions = () => {
	get(`${url}/api/suggestions/movies`).then(r => {
		r.forEach(object => {
			movieSuggestions.push(object.movieId);
		});
	});
};

//Renderers

const renderProjectPhase = () => {
	console.log(currentPhase);
	const $fase = document.querySelector('.fase');
	if (currentPhase == 0) {
		$fase.innerHTML = 'WACHTEN OP NIEUWE FILMAVOND';
	} else if (currentPhase == 1) {
		$fase.innerHTML = 'SUGGESTIES INZAMELEN';
	} else if (currentPhase == 2) {
		$fase.innerHTML = 'SELECTIE MAKEN';
	} else if (currentPhase == 3) {
		$fase.innerHTML = 'STEMMING';
	} else if (currentPhase == 4) {
		$fase.innerHTML = 'VOORBEREIDING FILMAVOND';
	}
};

const renderContent = section => {
	console.log(section);
	const $content = document.querySelector('.content');
	let html;
	switch (true) {
		case section == 'planning' && currentPhase == 0:
			html = `<p>hallo!</p>`;
			break;
		case section == 'berichten' && currentPhase == 0:
			html = `<p>hello</p>`;
			break;
		case section == 'inzendingen' && currentPhase == 0:
			const items = movieSuggestions.map(suggestion => {
				return `<li>${suggestion}</li>`;
			});
			html = `<ul>${items.join()}</ul>`;
			break;
		case 'vrijwilligers':
			break;
	}
	$content.innerHTML = html;
};

const renderVrijwilligers = () => {
	vrijwilligers.forEach(vrijwilliger => {
		const $newLi = document.createElement('li');
		const $firstName = document.createElement('p');
		const $lastName = document.createElement('p');

		$firstName.innerHTML = vrijwilliger.firstName;
		$lastName.innerHTML = vrijwilliger.lastName;

		$newLi.appendChild($firstName);
		$newLi.appendChild($lastName);

		document.querySelector('.vrijwilligersLijst').appendChild($newLi);
	});
};

const updateEventPhase = async eventBody => {
	await update(`${url}/cinemaEvent/phase`, eventBody);
	renderProjectPhase();
};

const postMessage = async pushMessage => {
	if ('participantsPhase' in pushMessage) {
		console.log('zit een fase in');
	} else {
		let finalRecipients = [];
		await get(`${url}/participants`).then(r => {
			r.forEach(participant => {
				finalRecipients.push(participant);
			});
		});
		const finalMessage = {
			payload: pushMessage.payload,
			recipients: finalRecipients,
			phase: pushMessage.phase
		};
		console.log(finalMessage);
		await post(`${url}/admin/push`, finalMessage);
	}
};

// const getEventPhase = async () => {
// 	await get(`${url}/cinemaEvent/phase`).then(data => (currentPhase = data));
// 	renderFase(currentPhase);
// };

const init = () => {
	//fetch stuff
	fetchVrijwilligers();
	//select stuff
	const $fase = document.querySelector('.fase');
	const $plus = document.querySelector('.plus');
	const $min = document.querySelector('.min');
	const $reset = document.querySelector('.reset');
	const $reload = document.querySelector('.reload');
	//select navigation elements
	const $planning = document.querySelector('.planning');
	const $berichten = document.querySelector('.berichten');
	const $inzendingen = document.querySelector('.inzendingen');
	const $vrijwilligers = document.querySelector('.vrijwilligers');
	//set stuff
	currentPhase = $fase.innerHTML;
	renderProjectPhase();
	renderContent('planning');
	//event listeners
	$planning.addEventListener('click', handlePlanningClick);
	$berichten.addEventListener('click', handleBerichtenClick);
	$inzendingen.addEventListener('click', handleInzendingenClick);
	$vrijwilligers.addEventListener('click', handleVrijwilligersClick);
	$plus.addEventListener('click', handlePlusClick);
	$min.addEventListener('click', handleMinClick);
	$reset.addEventListener('click', handleResetClick);
	// $reload.addEventListener('click', fetchVrijwilligers);
};

init();
