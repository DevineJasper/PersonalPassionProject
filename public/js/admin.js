console.log('hey admin');
const $plus = document.querySelector('.plus');
const $min = document.querySelector('.min');
let fase = 1;

const handlePlusClick = () => {
	// fase++;
	const data = {
		payload: 'REMINDER',
		phase: 1
	};
	// update(`https://pink-mule-87.localtunnel.me/cinemaEvent`, data);
	push(`https://pink-mule-87.localtunnel.me/webhook/push`, data);
};

const push = (url, data) => {
	fetch(url, getOptions('post', data));
};

const handleMinClick = () => {
	fase--;
	const data = {
		fase: fase
	};
	update(`https://pink-mule-87.localtunnel.me/cinemaEvent`, data);
};

const update = (url, data) => {
	fetch(url, getOptions('put', data));
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

init = () => {
	$plus.addEventListener('click', handlePlusClick);
	$min.addEventListener('click', handleMinClick);
};

init();
