console.log('movieDb.js');
let movies = [];
let currentSuggestions = [];
let amountSuggestions = document.querySelector('.suggestionsLength').innerHTML;
let userSuggestionsDb = false;
let newSuggestions = [];
let removedSuggestions = [];
let originalSuggestions = [];

const $ul = document.querySelector('.list');
const $suggestionsUl = document.querySelector('.currentSuggestions');

const url = document.querySelector('.url').innerHTML;
const user = document.querySelector('.psid').innerHTML;

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
const getUserSuggestions = () => {
	get(`${url}/suggestions/movies/${user}`).then(r => {
		if (r.length == 0) {
			document.querySelector('.zoek').classList.remove('hidden');
			$ul.classList.remove('hidden');
		} else {
			userSuggestionsDb = true;
			r.forEach(object => {
				originalSuggestions.push(object.movieId);
				addUserSuggestions(object.movieId);
			});
		}
	});
};

const addUserSuggestions = async movieId => {
	let movieObject = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=a108ea578de94e9156c38073bbd89613&language=en-EN`
	)
		.then(r => r.json())
		.then(data => {
			return data;
		});
	currentSuggestions.push(movieObject);
	renderSuggestions();
};

const fetchAll = url => {
	get(url).then(data => addMovies(data));
};

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
	movies.forEach(row => {
		console.log(row.poster_path);
		const $newLi = document.createElement('li');
		const $newArticle = document.createElement('article');
		$newArticle.classList.add('movieGrid');
		const $newHeading = document.createElement('h3');
		$newHeading.classList.add('movieTitle');
		const $newParagraph = document.createElement('p');
		$newParagraph.classList.add('movieOverview');
		const $newImg = document.createElement('img');
		$newImg.classList.add('moviePoster');
		const $newAnchor = document.createElement('a');
		$newAnchor.classList.add('info');
		const $newAdd = document.createElement('p');
		$newAdd.classList.add('add');
		const $newButtons = document.createElement('div');
		$newButtons.classList.add('buttons');
		$newButtons.appendChild($newAdd);
		$newButtons.appendChild($newAnchor);

		const title = row.title;
		const overview = row.overview;
		if (row.poster_path !== null) {
			const poster = row.poster_path;
			$newImg.src = `https://image.tmdb.org/t/p/w185/${poster}`;
		} else {
			$newImg.src = `/assets/images/backdrop_poster.png`;
		}
		const id = row.id;

		$newAdd.innerHTML = 'ADD';
		$newAdd.dataset.movieId = row.id;
		$newAdd.addEventListener('click', handleAdd);
		$newAnchor.setAttribute('target', '_blank');
		$newAnchor.href = `https://themoviedb.org/movie/${id}?language=en-EN`;
		$newAnchor.innerHTML = 'meer info';
		$newArticle.appendChild($newImg);
		$newHeading.innerHTML = title;
		$newArticle.appendChild($newHeading);
		$newParagraph.innerHTML = overview;
		$newArticle.appendChild($newParagraph);
		$newArticle.appendChild($newButtons);
		$newLi.appendChild($newArticle);
		$ul.appendChild($newLi);
	});
};

const handleAdd = async e => {
	const movieId = e.currentTarget.dataset.movieId;
	let movieObject = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=a108ea578de94e9156c38073bbd89613&language=nl-NL&`
	)
		.then(r => r.json())
		.then(data => {
			return data;
		});
	if (amountSuggestions < 3 && amountSuggestions > 0) {
		console.log('minder dan 3 suggesties');
		let objectInArray = false;
		currentSuggestions.forEach(movie => {
			if (movie.id === movieObject.id) {
				objectInArray = true;
			}
		});
		if (objectInArray === false) {
			currentSuggestions.push(movieObject);
			newSuggestions.push(movieObject);
			console.log(currentSuggestions);
			renderSuggestions();
		}
	} else if (amountSuggestions == 0) {
		currentSuggestions.push(movieObject);
		newSuggestions.push(movieObject);
		console.log(currentSuggestions);
		renderSuggestions();
	} else {
		document.querySelector('.amount').classList.remove('redAnimation');
		document.querySelector('.amount').classList.add('redAnimation');
		setTimeout(
			() => document.querySelector('.amount').classList.remove('redAnimation'),
			200
		);
	}
};

const renderSuggestions = () => {
	while ($suggestionsUl.firstChild)
		$suggestionsUl.removeChild($suggestionsUl.firstChild);
	amountSuggestions = 0;
	document.querySelector('.amount').innerHTML = amountSuggestions;
	currentSuggestions.forEach(suggestion => {
		amountSuggestions++;
		document.querySelector('.amount').innerHTML = amountSuggestions;
		const $newCont = document.createElement('div');
		const $newHeader = document.createElement('h3');
		const $newThumb = document.createElement('img');
		const $newDiv = document.createElement('div');

		$newDiv.innerHTML = 'X';
		$newHeader.innerHTML = suggestion.title;
		$newCont.appendChild($newThumb);
		$newCont.appendChild($newHeader);
		$newCont.appendChild($newDiv);
		$suggestionsUl.appendChild($newCont);
		$newThumb.src = `https://image.tmdb.org/t/p/w185/${suggestion.poster_path}`;
		$newDiv.addEventListener('click', () => {
			removeSuggestion(suggestion);
		});
	});
};

const removeSuggestion = suggestion => {
	removedSuggestions.push(suggestion.id);
	console.log(removedSuggestions);
	newSuggestions.forEach(movie => {
		if (movie.id === suggestion.id) {
			newSuggestions.splice(newSuggestions.indexOf(movie), 1);
			removedSuggestions.splice(removedSuggestions.indexOf(movie), 1);
		}
	});
	currentSuggestions.forEach(movie => {
		if (movie.id === suggestion.id) {
			currentSuggestions.splice(currentSuggestions.indexOf(movie), 1);
			renderSuggestions();
		}
	});
};

const handleZoek = e => {
	let value = e.currentTarget.value;
	console.log(value);
	if (value !== '') {
		fetchAll(
			`https://api.themoviedb.org/3/search/movie?api_key=a108ea578de94e9156c38073bbd89613&language=en-EN&query=${value}&page=1&include_adult=false`
		);
	} else {
		while ($ul.firstChild) $ul.removeChild($ul.firstChild);
		const $newLi = document.createElement('li');
		$newLi.innerHTML = 'Zoek naar een film!';
		$newLi.classList.add('instruction');
		$ul.appendChild($newLi);
	}
};

const handleSuggestionsClick = e => {
	const suggestionsWindow = document.querySelector('.suggestionsWindow');
	suggestionsWindow.classList.toggle('fullScreen');
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
	loadMessengerSDK(document, 'script', 'Messenger');
	// getUserSuggestions();
	document.querySelector('.submit').addEventListener('click', handleSubmit);
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		document.querySelector('.zoek').addEventListener('focus', lowerBottom);
		document.querySelector('.zoek').addEventListener('blur', higherBottom);
	}
	document.querySelector('.zoek').addEventListener('input', handleZoek);
	document
		.querySelector('.suggestionsBtn')
		.addEventListener('click', handleSuggestionsClick);
};
init();
