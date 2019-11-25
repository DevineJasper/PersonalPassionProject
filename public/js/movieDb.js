console.log('movieDb.js');
let names = [];
let user;

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
			fetchAll(
				'https://api.themoviedb.org/3/discover/movie?api_key=a108ea578de94e9156c38073bbd89613&language=nl-NL&sort_by=popularity.desc&include_adult=false&include_video=true&page=1'
			);
		},
		function error(err) {
			// error
		}
	);
};

//AJAX API
const fetchAll = url => {
	fetch(url)
		.then(r => r.json())
		.then(data => renderData(data));
};

const renderData = data => {
	console.log(data);
	const results = data.results;
	results.forEach(row => {
		if (!names.includes(row.name)) {
			const $newLi = document.createElement('li');
			const $newDiv = document.createElement('div');
			const $newHeading = document.createElement('h2');
			const $newParagraph = document.createElement('p');
			const $newImg = document.createElement('img');
			const $newAnchor = document.createElement('a');
			const $newInput = document.createElement('input');

			const title = row.title;
			const overview = row.overview;
			const poster = row.poster_path;
			const id = row.id;

			$newInput.type = 'radio';
			$newInput.name = 'movie';
			$newInput.value = id;
			$newAnchor.setAttribute('target', '_blank');
			$newAnchor.href = `https://themoviedb.org/movie/${id}?language=nl-NL`;
			$newImg.src = `https://image.tmdb.org/t/p/w185/${poster}`;
			$newDiv.appendChild($newImg);
			$newHeading.innerHTML = title;
			$newDiv.appendChild($newHeading);
			$newParagraph.innerHTML = overview;
			$newDiv.appendChild($newParagraph);

			names.push(title);
			$newAnchor.appendChild($newDiv);
			$newLi.appendChild($newAnchor);
			$newLi.appendChild($newInput);
			document.querySelector('.list').appendChild($newLi);
		}
	});
};

const handleSubmit = e => {
	e.preventDefault();
	const test = {
		psId: user,
		movieId: document.querySelector('input[name=movie]:checked').value
	};
	create('http://localhost:3000/api/test', test);
};

const create = (url, data) => {
	fetch(url, getOptions('post', data));
	console.log(data);
	const $newParagraph = document.createElement('p');
	const $div = document.querySelector('.status');
	$newParagraph.innerHTML = 'Verzonden naar database!';
	$div.appendChild($newParagraph);
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
};
init();
