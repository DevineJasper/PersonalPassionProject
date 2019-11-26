console.log('movieDb.js');
let movies = [];
let currentSuggestions = [];
let user;
let amountSuggestions = 0;

const $ul = document.querySelector('.list');
const $suggestionsUl = document.querySelector('.currentSuggestions');

//messenger extensions js SDK
const loadMessengerSDK = (d, s, id) => {
	let js;
	const fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = '//connect.facebook.net/en_US/messenger.Extensions.js';
	fjs.parentNode.insertBefore(js, fjs);
};

window.extAsyncInit = function() {
	MessengerExtensions.getContext(
		674330989637338,
		function success(thread_context) {
			user = thread_context.psid;
			console.log(user);
			getUserSuggestions(user);
		},
		function error(err) {
			// error
		}
	);
};

//AJAX API
const getUserSuggestions = user => {
	console.log('fetch specifieke films');
};

const fetchAll = url => {
	fetch(url)
		.then(r => r.json())
		.then(data => addMovies(data));
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
		const $newLi = document.createElement('li');
		const $newDiv = document.createElement('div');
		const $newHeading = document.createElement('h3');
		const $newParagraph = document.createElement('p');
		const $newImg = document.createElement('img');
		const $newAnchor = document.createElement('a');
		const $newAdd = document.createElement('p');

		const title = row.title;
		const overview = row.overview;
		const poster = row.poster_path;
		const id = row.id;

		$newAdd.innerHTML = 'ADD';
		$newAdd.dataset.movieId = row.id;
		$newAdd.setAttribute(
			'style',
			'cursor: pointer; background-color: black; color: white;'
		);
		$newAdd.addEventListener('click', handleAdd);
		$newAnchor.setAttribute('target', '_blank');
		$newAnchor.href = `https://themoviedb.org/movie/${id}?language=nl-NL`;
		$newImg.src = `https://image.tmdb.org/t/p/w185/${poster}`;
		$newDiv.appendChild($newImg);
		$newHeading.innerHTML = title;
		$newDiv.appendChild($newHeading);
		$newParagraph.innerHTML = overview;
		$newParagraph.setAttribute(
			'style',
			'line-height:15px; height: 30px; overflow: hidden;'
		);
		$newDiv.appendChild($newParagraph);
		$newAnchor.appendChild($newDiv);
		$newLi.appendChild($newAnchor);
		$newLi.appendChild($newAdd);
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
	if (amountSuggestions < 3 && amountSuggestions > -1) {
		console.log('added');
		currentSuggestions.push(movieObject);
		renderSuggestions();
		amountSuggestions++;
		document.querySelector('.amount').innerHTML = amountSuggestions;
	}
};

const renderSuggestions = () => {
	while ($suggestionsUl.firstChild)
		$suggestionsUl.removeChild($suggestionsUl.firstChild);
	currentSuggestions.forEach(suggestion => {
		console.log(suggestion);
		const $newLi = document.createElement('li');
		const $newHeader = document.createElement('h3');
		const $newThumb = document.createElement('img');

		$newHeader.innerHTML = suggestion.title;
		$newLi.appendChild($newThumb);
		$newLi.appendChild($newHeader);
		$suggestionsUl.appendChild($newLi);
		$suggestionsUl.setAttribute('style', 'position: relative; z-index: 998');
		$newThumb.src = `https://image.tmdb.org/t/p/w185/${suggestion.poster_path}`;
	});
};

const handleZoek = e => {
	let value = e.currentTarget.value;
	if (!value == '') {
		fetchAll(
			`https://api.themoviedb.org/3/search/movie?api_key=a108ea578de94e9156c38073bbd89613&language=nl-NL&query=${value}&page=1&include_adult=false`
		);
	} else {
		while ($ul.firstChild) $ul.removeChild($ul.firstChild);
		const $newLi = document.createElement('li');
		$newLi.innerHTML = 'search for a movie';
		$ul.appendChild($newLi);
	}
};

const handleSuggestionsClick = e => {
	const suggestionsContainer = document.querySelector('.suggestionsContainer');
	const suggestionsWindow = document.querySelector('.suggestionsWindow');
	const shadowScreen = document.querySelector('.shadow');
	suggestionsContainer.classList.toggle('toFront');
	suggestionsWindow.classList.toggle('fullScreen');
	shadowScreen.classList.toggle('shadowTrans');
	document.querySelector('html').classList.toggle('noScrollY');
	document.querySelector('.zoekContainer').classList.toggle('transparant');
};

const handleSubmit = e => {
	e.preventDefault();
	const test = {
		psId: user,
		movieId: document.querySelector('input[name=movie]:checked').value
	};
	create('http://localhost:3000/api/test', test);
	redirect('http://foolish-turkey-14.localtunnel.me/webhook');
};

const redirect = url => {
	console.log('proberen te posten');
	const bodyPost = {
		recipient: { id: user },
		message: {
			text: 'What we can do to help you today?',
			quick_replies: [
				{
					content_type: 'text',
					title: 'Test the webview',
					payload: 'TEST'
				},
				{
					content_type: 'text',
					title: 'Talk to an agent',
					payload: 'CARE_HELP'
				}
			]
		}
	};
	fetch(url, getOptions('post', bodyPost));
};

const create = (url, data) => {
	fetch(url, getOptions('post', data));
	console.log(data);
	const $newParagraph = document.createElement('p');
	const $div = document.querySelector('.status');
	$newParagraph.innerHTML = 'Verzonden naar database!';
	$div.appendChild($newParagraph);
	MessengerExtensions.requestCloseBrowser(
		(success = () => {
			//close webview
		}),
		(error = err => {})
	);
};

const getOptions = (method, body = null) => {
	const options = {
		method: method.toUpperCase(),
		headers: {
			'content-type': `application/json`
		}
	};
	if (body) {
		options.body = JSON.stringify(body);
	}
	return options;
};

const init = () => {
	loadMessengerSDK(document, 'script', 'Messenger');
	document.querySelector('.submit').addEventListener('click', handleSubmit);
	document.querySelector('.zoek').addEventListener('input', handleZoek);
	document
		.querySelector('.suggestionsBtn')
		.addEventListener('click', handleSuggestionsClick);
};
init();
