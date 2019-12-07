console.log('hey admin');
const url = document.querySelector('.url').innerHTML;
let currentPhase;
let vrijwilligers = [];
let activeHeadNav;
let activeSubNav;
let previousContent;
let previousSection;

//EXTRA Event Handlers //
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

//DATE CALCULATOR
const handleDatumFilmavond = e => {
	const startDate = new Date(e.currentTarget.value);
	//set start suggesties
	document.querySelector('#datumStartSuggesties').value = calculateDate(
		startDate,
		19
	);
	//set end suggesties
	document.querySelector('#datumEndSuggesties').value = calculateDate(
		startDate,
		14
	);
	//set start stemming
	document.querySelector('#datumStartStemming').value = calculateDate(
		startDate,
		12
	);
	//set end stemming
	document.querySelector('#datumEndStemming').value = calculateDate(
		startDate,
		7
	);
};

const calculateDate = (startDate, timeDiff) => {
	let newDate = new Date(startDate.getTime() - timeDiff * 24 * 60 * 60 * 1000),
		month = '' + (newDate.getMonth() + 1),
		day = '' + newDate.getDate(),
		year = newDate.getFullYear();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	return [year, month, day].join('-');
};

const handleOpslaan = () => {
	let alert = confirm(
		'Druk pas op OK als je alles in jullie agenda hebt geschreven hé!'
	);
	if (alert == true) {
		console.log('datums in database');
	} else {
		console.log('pas nog wa aan');
	}
};

//Content Bepaling

const renderProjectPhase = () => {
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

const renderContent = (e, section) => {
	if (previousContent != null) {
		previousContent.classList.add('hidden');
	}
	if (activeHeadNav != null) {
		activeHeadNav.style.textDecoration = 'none';
		activeHeadNav = e.currentTarget;
		activeHeadNav.style.textDecoration = 'underline';
	} else {
		activeHeadNav = e;
		activeHeadNav.style.textDecoration = 'underline';
	}
	switch (section) {
		case 'planning':
			previousContent = document.querySelector('.planningContent');
			previousContent.classList.remove('hidden');
			break;
		case 'berichten':
			previousContent = document.querySelector('.berichtenContent');
			previousContent.classList.remove('hidden');
			break;
		case 'inzendingen':
			previousContent = document.querySelector('.inzendingenContent');
			previousContent.classList.remove('hidden');
			break;
		case 'vrijwilligers':
			break;
	}
};

const renderInzendingen = (e, picker) => {
	if (previousSection != null) {
		previousSection.classList.add('hide');
	}
	if (activeSubNav != null) {
		activeSubNav.style.textDecoration = 'none';
		activeSubNav = e.currentTarget;
		activeSubNav.style.textDecoration = 'underline';
	} else {
		activeSubNav = e;
		activeSubNav.style.textDecoration = 'underline';
	}
	if (currentPhase == 0) {
		const $inzendingenPicker = document.querySelector('.inzendingenPicker');
		$inzendingenPicker.classList.add('hide');
		previousSection = document.querySelector('.wachten');
		previousSection.classList.remove('hide');
	} else {
		switch (picker) {
			case 'films':
				if (currentPhase == 1) {
					previousSection = document.querySelector('.suggestionsMoviesGrid');
					previousSection.classList.remove('hide');
				}
				break;
			case 'drinks':
				if (currentPhase == 1) {
					previousSection = document.querySelector('.suggestionsDrinksGrid');
					previousSection.classList.remove('hide');
				}
				break;
			case 'snacks':
				break;
		}
	}
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
	//select navigation elements
	const $planning = document.querySelector('.planning');
	const $berichten = document.querySelector('.berichten');
	const $inzendingen = document.querySelector('.inzendingen');
	const $vrijwilligers = document.querySelector('.vrijwilligers');
	//navigation elements eventlisteners
	$planning.addEventListener('click', e => renderContent(e, 'planning'));
	$berichten.addEventListener('click', e => renderContent(e, 'berichten'));
	$inzendingen.addEventListener('click', e => renderContent(e, 'inzendingen'));
	$vrijwilligers.addEventListener('click', e =>
		renderContent(e, 'vrijwilligers')
	);
	//select subnavigation elements
	const $filmsBtn = document.querySelector('.pickerFilms');
	const $drinksBtn = document.querySelector('.pickerDrinks');
	const $snacksBtn = document.querySelector('.pickerSnacks');
	//subnavigation elements eventlisteners
	$filmsBtn.addEventListener('click', e => renderInzendingen(e, 'films'));
	$drinksBtn.addEventListener('click', e => renderInzendingen(e, 'drinks'));
	$snacksBtn.addEventListener('click', e => renderInzendingen(e, 'snacks'));
	//select datum setter
	const $datumFilmavond = document.querySelector('#datumFilmavond');
	const $datumsOpslaan = document.querySelector('.datumsOpslaan');
	//evenlistener datum setter
	$datumFilmavond.addEventListener('input', handleDatumFilmavond);
	$datumsOpslaan.addEventListener('click', handleOpslaan);
	//select extra stuff
	const $fase = document.querySelector('.fase');
	const $plus = document.querySelector('.plus');
	const $min = document.querySelector('.min');
	const $reset = document.querySelector('.reset');
	//set stuff
	currentPhase = $fase.innerHTML;
	renderProjectPhase();
	renderContent($planning, 'planning');
	renderInzendingen($filmsBtn, 'films');
	//extra event listeners
	$plus.addEventListener('click', handlePlusClick);
	$min.addEventListener('click', handleMinClick);
	$reset.addEventListener('click', handleResetClick);
};

init();
