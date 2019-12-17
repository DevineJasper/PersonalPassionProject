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
	const pushMessage = {
		payload: 'GET_STARTED',
		text: ''
	};
	updateEventPhase();
	postMessage(pushMessage);
};

const handlePlusClick = async () => {
	if (currentPhase != 6) {
		currentPhase++;
		const pushMessage = {
			payload: 'GET_STARTED',
			text: ''
		};
		updateEventPhase();
		postMessage(pushMessage);
	} else {
		console.log('we zitten aan max fase');
	}
};

const handleMinClick = async () => {
	if (currentPhase != 0) {
		currentPhase--;
		const pushMessage = {
			payload: 'GET_STARTED',
			text: ''
		};
		updateEventPhase();
		postMessage(pushMessage);
	} else {
		console.log('we zitten aan min fase');
	}
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
	console.log('opslaan die datums!');
	// let alert = confirm(
	// 	'Druk pas op OK als je alles in jullie agenda hebt geschreven hé!'
	// );
	// if (alert == true) {
	// 	console.log('datums in database');
	// } else {
	// 	console.log('pas nog wa aan');
	// }
	const valFilmavond = document.querySelector('#datumFilmavond').value;
	const valStartSug = document.querySelector('#datumStartSuggesties').value;
	const valEndSug = document.querySelector('#datumEndSuggesties').value;
	const valStartStem = document.querySelector('#datumStartStemming').value;
	const valEndStem = document.querySelector('#datumEndStemming').value;
	const finalValFilmavond = `${valFilmavond}T10:00:00.`;
	const finalValStartSug = `${valStartSug}T10:00:00`;
	const finalValEndSug = `${valEndSug}T10:00:00`;
	const finalValStartStem = `${valStartStem}T10:00:00`;
	const finalValEndStem = `${valEndStem}T10:00:00`;
	const datesBody = {
		startSuggesties: finalValStartSug,
		endSuggesties: finalValEndSug,
		startStemming: finalValStartStem,
		endStemming: finalValEndStem,
		filmAvond: finalValFilmavond
	};
	update(`/api/cinemaEvent/dates`, datesBody);
	currentPhase++;
	updateEventPhase();
	const pushMessage = {
		payload: 'GET_STARTED',
		phase: currentPhase
	};
	postMessage(pushMessage);
};

//Content Bepaling

const renderProjectPhase = () => {
	const $fase = document.querySelector('.fase');
	if (currentPhase == 0) {
		$fase.innerHTML = 'NIEUWE FILMAVOND INPLANNEN';
	} else if (currentPhase == 1) {
		$fase.innerHTML = 'WACHTEN TOT START SUGGESTIERONDE';
	} else if (currentPhase == 2) {
		$fase.innerHTML = 'SUGGESTIERONDE';
	} else if (currentPhase == 3) {
		$fase.innerHTML = 'SELECTIE MAKEN';
	} else if (currentPhase == 4) {
		$fase.innerHTML = 'STEMMINGRONDE';
	} else if (currentPhase == 5) {
		$fase.innerHTML = 'VOORBEREIDING FILMAVOND';
	} else if (currentPhase == 6) {
		$fase.innerHTML = 'FILMAVOND VANDAAG';
	}
};

let selectedParticipants = null;

const renderContent = (e, section) => {
	selectedParticipants = null;
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
			plannerShown = false;
			planningShown = false;
			selectedParticipants = null;
			previousContent = document.querySelector('.planningContent');
			previousContent.classList.remove('hidden');
			const $planner = document.querySelector('.planningPlanner');
			const $planning = document.querySelector('.planningPlanning');
			if (currentPhase == 0) {
				if (!$planning.classList.contains('hide')) {
					$planning.classList.add('hide');
				}
				$planner.classList.remove('hide');
			} else {
				if (!$planner.classList.contains('hide')) {
					$planner.classList.add('hide');
				}
				$planning.classList.remove('hide');
			}
			break;
		case 'berichten':
			selectedParticipants = null;
			previousContent = document.querySelector('.berichtenContent');
			previousContent.classList.remove('hidden');
			//
			let participantsPhase = 0;
			//
			const receiverIedereen = document.createElement('li');
			receiverIedereen.classList.add('receiverItem');
			receiverIedereen.innerHTML = 'Iedereen';
			receiverIedereen.dataset.participantsPhase = 'geen';
			//
			const receiverGetStarted = document.createElement('li');
			receiverGetStarted.classList.add('receiverItem');
			receiverGetStarted.innerHTML = 'Get Started gedrukt';
			receiverGetStarted.dataset.participantsPhase = 0;
			//
			const receiverSuggestie = document.createElement('li');
			receiverSuggestie.innerHTML = 'Een suggestie doorgestuurd';
			receiverSuggestie.classList.add('receiverItem');
			receiverSuggestie.dataset.participantsPhase = 1;
			//
			const receiverStemming = document.createElement('li');
			receiverStemming.innerHTML = 'Een stemming doorgestuurd';
			receiverStemming.classList.add('receiverItem');
			receiverStemming.dataset.participantsPhase = 2;
			//
			let receivers = [];
			if (currentPhase == 0 || currentPhase == 1) {
				receivers.push(receiverIedereen);
				receivers.push(receiverGetStarted);
			} else if (currentPhase == 2) {
				receivers.push(receiverIedereen);
				receivers.push(receiverGetStarted);
				receivers.push(receiverSuggestie);
			} else if (
				currentPhase == 3 ||
				currentPhase == 4 ||
				currentPhase == 5 ||
				currentPhase == 6
			) {
				receivers.push(receiverIedereen);
				receivers.push(receiverGetStarted);
				receivers.push(receiverSuggestie);
				receivers.push(receiverStemming);
			}
			//
			selectedParticipants = null;
			receivers.forEach(receiver => {
				receiver.addEventListener('click', e => {
					if (e.currentTarget.classList.contains('selectedParticipants')) {
						e.currentTarget.classList.remove('selectedParticipants');
						selectedParticipants = null;
					} else {
						if (selectedParticipants !== null) {
							selectedParticipants.classList.remove('selectedParticipants');
						}
						selectedParticipants = e.currentTarget;
						selectedParticipants.classList.add('selectedParticipants');
						participantsPhase = receiver.dataset.participantsPhase;
						console.log(participantsPhase);
					}
				});
			});
			const $receiverUl = document.querySelector('.receiversList');
			while ($receiverUl.firstChild)
				$receiverUl.removeChild($receiverUl.firstChild);
			receivers.forEach(receiver => {
				$receiverUl.appendChild(receiver);
			});
			const $messageSend = document.querySelector('.messageSubmit');
			let textToSend;
			const $messageText = document.querySelector('.messageBody');
			$messageText.addEventListener('input', e => {
				textToSend = e.currentTarget.value;
			});
			$messageSend.addEventListener('click', () => {
				const $errorBericht = document.querySelector('.berichtenError');
				if ($errorBericht.classList.contains('errorPositive')) {
					$errorBericht.classList.remove('errorPositive');
				}
				if (
					(textToSend == undefined || textToSend.length < 2) &&
					selectedParticipants == null
				) {
					$errorBericht.innerHTML =
						'Vul een bericht in en selecteer een ontvanger';
				} else if (textToSend == undefined || textToSend.length < 2) {
					$errorBericht.innerHTML = 'Vul een bericht in';
				} else if (selectedParticipants == null) {
					$errorBericht.innerHTML = 'Selecteer een ontvanger';
				} else {
					handleMessageSend(textToSend, participantsPhase);
					$errorBericht.innerHTML = 'Verzonden!';
					$errorBericht.classList.add('errorPositive');
					selectedParticipants = null;
					const selected = document.querySelector('.selectedParticipants');
					selected.classList.remove('selectedParticipants');
					const $messageText = document.querySelector('.messageBody');
					$messageText.value = '';
				}
			});
			break;
		case 'inzendingen':
			selectedParticipants = null;
			previousContent = document.querySelector('.inzendingenContent');
			previousContent.classList.remove('hidden');
			break;
		case 'vrijwilligers':
			selectedParticipants = null;
			previousContent = document.querySelector('.vrijwilligersGrid');
			previousContent.classList.remove('hidden');
			//
			const vrijwilligersDelete = document.querySelectorAll(
				'.vrijwilligerDelete'
			);
			vrijwilligersDelete.forEach(del => {
				del.addEventListener('click', async e => {
					const psid = e.currentTarget.dataset.psid;
					body = {
						vrijwilliger: 0
					};
					const stringPsid = String(psid);
					await update(`/participants/vrijwilligers/${psid}`, body);
					const listItem = previousContent.querySelector(
						`li[data-psid="${stringPsid}"]`
					);
					previousContent.removeChild(listItem);
				});
			});
			//
			const vrijwilligersChecked = document.querySelectorAll(
				'.vrijwilligerChecked'
			);
			vrijwilligersChecked.forEach(check => {
				check.addEventListener('click', async e => {
					const psid = e.currentTarget.dataset.psid;
					let isChecked = e.currentTarget.dataset.checked;
					if (isChecked == 1) {
						isChecked = 0;
					} else {
						isChecked = 1;
					}
					e.currentTarget.dataset.checked = isChecked;
					body = {
						checked: isChecked
					};
					const name = document.querySelector(`h4[data-psid="${psid}"]`);
					name.classList.toggle('vrijwilligerIsChecked');
					await update(`/participants/vrijwilligers/${psid}`, body);
				});
			});
			break;
	}
};

const handleMessageSend = (message, phase) => {
	console.log(message);
	const pushMessage = {
		payload: 'REMINDER',
		participantsPhase: phase,
		text: message
	};
	postMessage(pushMessage);
};

let currentSelectionTool;

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
	if (currentPhase == 0 || currentPhase == 1) {
		const $inzendingenPicker = document.querySelector('.inzendingenPicker');
		$inzendingenPicker.classList.add('hide');
		previousSection = document.querySelector('.wachten');
		previousSection.classList.remove('hide');
	} else {
		switch (picker) {
			case 'films':
				const $addBtn = document.querySelectorAll('.adminMovieAdd');
				const $selectionTool = document.querySelector('.selectionToolCont');
				currentSelectionTool = $selectionTool;
				if (currentPhase == 2) {
					previousSection = document.querySelector('.suggestionsMoviesGrid');
					previousSection.classList.remove('hide');
					if (!$selectionTool.classList.contains('hide')) {
						$selectionTool.classList.add('hide');
					}
					$addBtn.forEach(btn => {
						if (!btn.classList.contains('disabledButton')) {
							btn.classList.add('disabledBtn');
						}
					});
				} else if (currentPhase == 3) {
					previousSection = document.querySelector('.suggestionsMoviesGrid');
					previousSection.classList.remove('hide');
					$selectionTool.classList.remove('hide');
					$addBtn.forEach(btn => {
						btn.classList.remove('disabledButton');
						btn.addEventListener('click', () =>
							handleFilmAdd(btn.dataset.movie)
						);
					});
				} else if (currentPhase == 4) {
					previousSection = document.querySelector('.votesMovieGrid');
					previousSection.classList.remove('hide');
					if (!$selectionTool.classList.contains('hide')) {
						$selectionTool.classList.add('hide');
					}
					$addBtn.forEach(btn => {
						if (!btn.classList.contains('disabledButton')) {
							btn.classList.add('disabledBtn');
						}
					});
				} else if (currentPhase == 5) {
					previousSection = document.querySelector('.finalFilmGrid');
					previousSection.classList.remove('hide');
				}
				break;
			case 'drinks':
				const drinksSelectionTool = document.querySelector(
					'.drinksSelectionToolCont'
				);
				const headerTool = drinksSelectionTool.querySelector(
					'.selectionToolHeader'
				);
				headerTool.addEventListener('click', () => {
					console.log(drinksSelectionTool);
					if (drinksSelectionTool.classList.contains('selectionFullscreen')) {
						console.log('contains fullscreen');
						drinksSelectionTool.classList.remove('selectionFullscreen');
						console.log(drinksSelectionTool);
					}
					drinksSelectionTool.classList.add('selectionFullscreen');
				});
				console.log(drinksSelectionTool);
				if (currentSelectionTool !== null) {
					currentSelectionTool.classList.add('hide');
				}
				if (currentPhase > 1 && currentPhase < 5) {
					previousSection = document.querySelector('.suggestionsDrinksGrid');
					previousSection.classList.remove('hide');
				}
				if (currentPhase > 2 && currentPhase <5) {
					console.log(drinksSelectionTool);
					drinksSelectionTool.classList.remove('hide');
				}
				break;
			case 'snacks':
				previousSection = document.querySelector('.suggestionsSnacksGrid');
				previousSection.classList.remove('hide');
				break;
		}
	}
};

let movieSelection = [];
let originalSelection = [];
let newSelection = [];
let amountSelection = 0;
const $movieSelectionUl = document.querySelector('.movieSelectionUl');
let removedSelection = [];

getCurrentSelection = async () => {
	movieSelection = await get('/api/selection/films');
	originalSelection = [...movieSelection];
	renderSelectedMovies();
};

const checkOg = suggestion => {
	let isInArray = false;
	originalSelection.forEach(og => {
		if (og.movieId == suggestion.movieId) {
			isInArray == true;
		}
	});
	if (isInArray == false) {
		newSelection.push(suggestion);
	}
};

const checkNew = suggestion => {
	let isInArray = false;
	newSelection.forEach(newItem => {
		if (newItem.movieId == suggestion.movieId) {
			isInArray == true;
		}
	});
	if (isInArray == true) {
		newSelection.splice(movieSelection.indexOf(suggestion), 1);
	}
};

const handleFilmAdd = suggestion => {
	const movie = JSON.parse(suggestion);

	switch (true) {
		case amountSelection == 0:
			console.log('nog geen suggestions');
			movieSelection.push(movie);
			checkOg(movie);
			// newSuggestions.push(movie);
			renderSelectedMovies();
			// renderList(movies);
			break;
		case amountSelection > 0 && amountSelection < 3:
			let isInArray = false;
			movieSelection.forEach(suggestion => {
				if (suggestion.id === movie.id) {
					isInArray = true;
				}
			});
			if (isInArray === false) {
				console.log('welkom');
				// newSuggestions.push(movie);
				movieSelection.push(movie);
				renderSelectedMovies();
				// renderList(movies);
			}
			break;
		case amountSelection >= 3:
			console.log('meer dan 3');
			document.querySelector('.selectionAmount').classList.add('redAnimation');
			setTimeout(
				() =>
					document
						.querySelector('.selectionAmount')
						.classList.remove('redAnimation'),
				500
			);
			break;
	}
};

const removeSelectedItem = item => {
	movieSelection.splice(movieSelection.indexOf(item), 1);
	console.log(originalSelection);
	checkNew(item);
	originalSelection.forEach(og => {
		if (item.movieId == og.movieId) {
			console.log('OG verwijderen');
			removedSelection.push(og);
			console.log(removedSelection);
		}
	});
	renderSelectedMovies();
};

const renderSelectedMovies = () => {
	while ($movieSelectionUl.firstChild)
		$movieSelectionUl.removeChild($movieSelectionUl.firstChild);
	amountSelection = 0;
	document.querySelector('.selectionAmount').innerHTML = amountSelection;
	movieSelection.forEach(suggestion => {
		amountSelection++;
		document.querySelector('.selectionAmount').innerHTML = amountSelection;
		const $userMovieItem = document.createElement('li');
		$userMovieItem.classList.add('userMovieItem');

		const $userMovieGrid = document.createElement('article');
		$userMovieGrid.classList.add('userMovieGrid');

		const $userMovieHeader = document.createElement('header');
		$userMovieHeader.classList.add('userMovieHeader');

		const $userMovieTitle = document.createElement('h2');
		$userMovieTitle.classList.add('userMovieTitle');
		$userMovieTitle.innerHTML = suggestion.title;

		$userMovieHeader.appendChild($userMovieTitle);
		$userMovieGrid.appendChild($userMovieHeader);

		const $userMoviePoster = document.createElement('img');
		$userMoviePoster.classList.add('userMoviePoster');
		if (suggestion.poster_path !== null) {
			$userMoviePoster.src = `https://image.tmdb.org/t/p/w185/${suggestion.poster_path}`;
		} else {
			$userMoviePoster.src = `/assets/images/backdrop_poster.png`;
		}

		$userMovieGrid.appendChild($userMoviePoster);

		const $userMovieDelete = document.createElement('div');
		$userMovieDelete.classList.add('userMovieDelete');

		const $span = document.createElement('span');
		$span.innerHTML = 'verwijder';
		$userMovieDelete.appendChild($span);

		$userMovieDelete.addEventListener('click', () => {
			removeSelectedItem(suggestion);
		});

		$userMovieGrid.appendChild($userMovieDelete);

		$userMovieItem.appendChild($userMovieGrid);

		$movieSelectionUl.appendChild($userMovieItem);
	});
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

const updateEventPhase = async () => {
	const eventBody = {
		eventPhase: currentPhase
	};
	await update(`/api/cinemaEvent/phase`, eventBody);
	renderProjectPhase();
	activeHeadNav = null;
	activeSubNav = null;
	const $planningPlanner = document.querySelector('.planningPlanner');
	$planningPlanner.classList.add('hide');
	const $planning = document.querySelector('.planning');
	const $filmsBtn = document.querySelector('.pickerFilms');
	renderContent($planning, 'planning');
	renderInzendingen($filmsBtn, 'films');
	// await postMessage();
};

const postMessage = async pushMessage => {
	let finalRecipients = [];
	if ('participantsPhase' in pushMessage) {
		if (pushMessage.participantsPhase == 'geen') {
			await get(`/participants`).then(r => {
				r.forEach(participant => {
					finalRecipients.push(participant);
				});
			});
		} else {
			const phase = pushMessage.participantsPhase;
			await get(`/participants/${phase}`).then(r => {
				r.forEach(participant => {
					finalRecipients.push(participant);
				});
			});
		}
	} else {
		await get(`/participants`).then(r => {
			r.forEach(participant => {
				finalRecipients.push(participant);
			});
		});
	}
	const finalMessage = {
		payload: pushMessage.payload,
		text: pushMessage.text,
		recipients: finalRecipients,
		phase: currentPhase
	};
	console.log(finalMessage);
	await post(`/admin/push`, finalMessage);
};

//SelectionTool
const handleSelectionClick = () => {
	const $selectionTool = document.querySelector('.selectionToolCont');
	$selectionTool.classList.toggle('selectionFullscreen');
};

const handleSubmitClick = () => {
	console.log('clicked');
	if (movieSelection.length < 3) {
		console.log('te weinig movies selected');
	} else {
		const selectionBody = {
			movies: movieSelection
		};
		post(`/api/selection/films`, selectionBody);
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
	const $selection = document.querySelector('.selectionToolHeader');
	const $submit = document.querySelector('.submit');
	//set stuff
	currentPhase = $fase.innerHTML;
	renderProjectPhase();
	renderContent($planning, 'planning');
	renderInzendingen($filmsBtn, 'films');
	getCurrentSelection();
	//extra event listeners
	$plus.addEventListener('click', handlePlusClick);
	$min.addEventListener('click', handleMinClick);
	$reset.addEventListener('click', handleResetClick);
	$selection.addEventListener('click', handleSelectionClick);
	$submit.addEventListener('click', handleSubmitClick);
};

init();
