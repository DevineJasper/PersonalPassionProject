console.log('movieDb.js');
let movies = [];
let newSuggestions = [];
let removedSuggestions = [];

const $ul = document.querySelector('.list');
const $suggestionsUl = document.querySelector('.currentSuggestions');

//messenger extensions js SDK
function loadMessengerSDK(d, s, id) {
	console.log('Messenger SDK inladen: INIT');
	let js;
	const fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = '../../js/messenger.Extensions.js';
	fjs.parentNode.insertBefore(js, fjs);
	console.log('Messenger SDK inladen: COMPLETED');
}

window.fbAsyncInit = () => {
	console.log('hey');
	MessengerExtensions.getContext(
		674330989637338,
		(success = thread_context => {
			console.log('thread_context ophalen: INIT');
			if (thread_context.psid) {
				console.log('We zitten op FB');
			}
		}),
		(error = err => {
			console.log('Kan facebook profiel niet bereiken');
			const link = document.createElement('a');
			link.innerHTML = 'https://www.facebook.com/messages/t/cinematjes';
			link.href = 'https://www.facebook.com/messages/t/cinematjes';
			const $redirect = document.querySelector('.redirect');
			$redirect.innerHTML = 'Ga naar: ';
			$redirect.appendChild(link);
			document.querySelector('.suggestionsWindow').style.display = 'none';
		})
	);
};

//AJAX API
const addMovies = data => {
	movies = [];
	const results = data.results;
	results.forEach(row => {
		movies.push(row);
	});
	renderList();
};

const renderList = () => {
	while ($ul.firstChild) $ul.removeChild($ul.firstChild);
	if (movies.length == 0) {
		const $newLi = document.createElement('li');
		$newLi.classList.add('instruction');
		$newLi.innerHTML = 'Geen films gevonden...';
		$ul.appendChild($newLi);
	} else {
		movies.forEach(row => {
			console.log(row.poster_path);
			const $newLi = document.createElement('li');
			const $newArticle = document.createElement('article');
			$newArticle.classList.add('movieGrid');
			const $newHeading = document.createElement('h2');
			$newHeading.classList.add('movieTitle');
			const $newParagraph = document.createElement('p');
			$newParagraph.classList.add('movieOverview');
			const $newImg = document.createElement('img');
			$newImg.classList.add('moviePoster');
			const $newAnchor = document.createElement('a');
			$newAnchor.classList.add('info', 'button');
			const $newAdd = document.createElement('p');
			$newAdd.classList.add('add');
			const $newButtons = document.createElement('div');
			$newButtons.classList.add('adminMovieButtons');
			$newButtons.appendChild($newAdd);
			$newButtons.appendChild($newAnchor);
			$newSpan = document.createElement('span');
			$newSpan.classList.add('ext-link');

			const title = row.title;
			const overview = row.overview;
			if (row.poster_path !== null) {
				const poster = row.poster_path;
				$newImg.src = `https://image.tmdb.org/t/p/w185/${poster}`;
			} else {
				$newImg.src = `/assets/images/backdrop_poster.png`;
			}
			const id = row.id;

			let inCurrentArray = false;
			currentSuggestions.forEach(suggestion => {
				if (suggestion.id === row.id) {
					inCurrentArray = true;
				}
			});
			if (inCurrentArray == false) {
				$newAdd.innerHTML = 'voeg toe';
				$newAdd.classList.add('button');
			} else {
				$newAdd.innerHTML = 'toegevoegd';
				$newAdd.classList.add('disabledButton');
			}
			$newAdd.addEventListener('click', () => handleAdd(row));
			$newAnchor.setAttribute('target', '_blank');
			$newAnchor.href = `https://themoviedb.org/movie/${id}?language=en-EN`;
			$newAnchor.innerHTML = 'meer info';
			$newAnchor.appendChild($newSpan);
			$newArticle.appendChild($newImg);
			$newHeading.innerHTML = title;
			$newArticle.appendChild($newHeading);
			$newParagraph.innerHTML = overview;
			$newArticle.appendChild($newParagraph);
			$newArticle.appendChild($newButtons);
			$newLi.appendChild($newArticle);
			$ul.appendChild($newLi);
		});
	}
};

const handleAdd = movie => {
	console.log(movie);
	switch (true) {
		case amountSuggestions == 0:
			console.log('nog geen suggestions');
			currentSuggestions.push(movie);
			newSuggestions.push(movie);
			renderSuggestions();
			renderList(movies);
			break;
		case amountSuggestions > 0 && amountSuggestions < 3:
			let isInArray = false;
			currentSuggestions.forEach(suggestion => {
				if (suggestion.id === movie.id) {
					isInArray = true;
				}
			});
			if (isInArray === false) {
				console.log('welkom');
				newSuggestions.push(movie);
				currentSuggestions.push(movie);
				renderSuggestions();
				renderList(movies);
			}
			break;
		case amountSuggestions >= 3:
			console.log('meer dan 3');
			document.querySelector('.amount').classList.add('redAnimation');
			setTimeout(
				() =>
					document.querySelector('.amount').classList.remove('redAnimation'),
				1000
			);
			break;
	}
};

const renderSuggestions = () => {
	let $renderAmount = document.querySelector('.amount');
	while ($suggestionsUl.firstChild)
		$suggestionsUl.removeChild($suggestionsUl.firstChild);
	amountSuggestions = 0;
	$renderAmount.innerHTML = amountSuggestions;
	currentSuggestions.forEach(suggestion => {
		amountSuggestions++;
		$renderAmount.innerHTML = amountSuggestions;

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
			removeSuggestion(suggestion);
		});

		$userMovieGrid.appendChild($userMovieDelete);

		$userMovieItem.appendChild($userMovieGrid);

		$suggestionsUl.appendChild($userMovieItem);
	});
};

const removeSuggestion = removed => {
	removedSuggestions.push(removed);
	newSuggestions.forEach(newSuggestion => {
		if (newSuggestion.id === removed.id) {
			newSuggestions.splice(newSuggestions.indexOf(newSuggestion), 1);
			removedSuggestions.splice(removedSuggestions.indexOf(removed), 1);
		}
	});
	currentSuggestions.forEach(suggestion => {
		if (suggestion.id === removed.id) {
			currentSuggestions.splice(currentSuggestions.indexOf(suggestion), 1);
			renderSuggestions();
			renderList(movies);
		}
	});
};

const handleZoek = async e => {
	let value = e.currentTarget.value;
	if (value !== '') {
		await get(
			`https://api.themoviedb.org/3/search/movie?api_key=a108ea578de94e9156c38073bbd89613&language=en-EN&query=${value}&page=1&include_adult=false`
		).then(data => {
			addMovies(data);
		});
	} else {
		while ($ul.firstChild) $ul.removeChild($ul.firstChild);
		const $newLi = document.createElement('li');
		$newLi.classList.add('instruction');
		$ul.appendChild($newLi);
		$newLi.innerHTML = 'Zoek naar een film...';
	}
};

const handleSuggestionsClick = e => {
	const suggestionsWindow = document.querySelector('.suggestionsWindow');
	suggestionsWindow.classList.toggle('fullScreen');
	const suggestionsArrow = document.querySelector('.suggestionsArrow');
	suggestionsArrow.classList.toggle('down');
	document.querySelector('html').classList.toggle('noScrollY');
	document.querySelector('.searchContainer').classList.toggle('transparant');
};

const handleSubmit = async () => {
	let suggestionsToAdd = [];
	newSuggestions.forEach(suggestion => {
		suggestionsToAdd.push({ movieId: suggestion.id, psid: user });
	});
	console.log(suggestionsToAdd);
	if (userSuggestionsDb) {
		if (removedSuggestions.length > 0) {
			const toRemove = {
				psid: user,
				movieId: removedSuggestions
			};
			await remove(`${url}/suggestions/movies/${user}`, toRemove);
		}
	}
	if (suggestionsToAdd.length > 0) {
		const toPost = {
			movies: suggestionsToAdd
		};
		await post(`${url}/suggestions/movies/${user}`, toPost);
	}

	const $submit = document.querySelector('.submit');
	$submit.innerHTML = 'Verzonden!';
	MessengerExtensions.requestCloseBrowser(
		(success = () => {
			//close webview
		}),
		(error = err => {})
	);
	// redirect('http://pink-mule-87.localtunnel.me/webhook');
};

const higherBottom = () => {
	const $submitContainter = document.querySelector('.submitContainer');
	$submitContainter.setAttribute('style', `bottom: 0;`);
};
const lowerBottom = () => {
	const $submitContainer = document.querySelector('.submitContainer');
	$submitContainer.setAttribute('style', `bottom: -5000px;`);
};

const init = () => {
	if (currentSuggestions.length > 0 && userSuggestionsDb == true) {
		renderSuggestions();
	}
	loadMessengerSDK(document, 'script', 'Messenger');
	document.querySelector('.submit').addEventListener('click', handleSubmit);
	// if (
	// 	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	// 		navigator.userAgent
	// 	)
	// ) {
	// 	document.querySelector('.zoek').addEventListener('focus', lowerBottom);
	// 	document.querySelector('.zoek').addEventListener('blur', higherBottom);
	// }
	document.querySelector('.zoek').addEventListener('input', handleZoek);
	document
		.querySelector('.suggestionsBtnCont')
		.addEventListener('click', handleSuggestionsClick);
};
init();
