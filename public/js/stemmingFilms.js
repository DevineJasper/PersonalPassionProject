console.log('heyhey');

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

const handleClickAdd = e => {
	const movie = e.currentTarget.dataset.movie;

	console.log(psid);
	const stemmingBody = {
		film: movie
	};
	post(`/api/stemming/${psid}`, stemmingBody);
	body = {
		phase: 2
	};
	MessengerExtensions.requestCloseBrowser(
		(success = async () => {
			await update(`/participants/${user}`, body);
		}),
		(error = err => {})
	);
};

const init = () => {
	loadMessengerSDK(document, 'script', 'Messenger');
	const addBtns = document.querySelectorAll('.stemmingMovieAdd');
	addBtns.forEach(btn => {
		btn.addEventListener('click', handleClickAdd);
	});
};
init();
