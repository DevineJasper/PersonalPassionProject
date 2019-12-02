console.log('hey admin');
const url = document.querySelector('.url').innerHTML;
let currentPhase;
let vrijwilligers = [];

const handleResetClick = async () => {
	currentPhase = 1;
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

const updateEventPhase = async eventBody => {
	await update(`${url}/cinemaEvent/phase`, eventBody);
	renderPhase();
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

// const getEventPhase = async () => {
// 	await get(`${url}/cinemaEvent/phase`).then(data => (currentPhase = data));
// 	renderFase(currentPhase);
// };

const renderPhase = () => {
	document.querySelector('.fase').innerHTML = currentPhase;
};

const fetchVrijwilligers = async () => {
	await get(`${url}/participants/vrijwilligers`).then(r => {
		r.forEach(volunteer => {
			vrijwilligers.push(volunteer);
		});
	});
	renderVrijwilligers();
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

const init = () => {
	//fetch stuff
	fetchVrijwilligers();
	//select stuff
	currentPhase = document.querySelector('.fase').innerHTML;
	const $plus = document.querySelector('.plus');
	const $min = document.querySelector('.min');
	const $reset = document.querySelector('.reset');
	const $reload = document.querySelector('.reload');
	//event listeners
	$plus.addEventListener('click', handlePlusClick);
	$min.addEventListener('click', handleMinClick);
	$reset.addEventListener('click', handleResetClick);
	$reload.addEventListener('click', fetchVrijwilligers);
};

init();
