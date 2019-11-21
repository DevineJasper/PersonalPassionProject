console.log('externe js enabled');

let names = [];

const fetchAll = url => {
	fetch(url)
		.then(r => r.json())
		.then(data => renderData(data));
};

const renderData = data => {
	data.forEach(row => {
		if (!names.includes(row.name)) {
			const newLi = document.createElement('li');
			newLi.innerHTML = row.name;
			names.push(row.name);
			document.querySelector('.list').appendChild(newLi);
		}
	});
};

const create = (url, data) => {
	fetch(url, getOptions('post', data));
	document.querySelector('#id').value = '';
	document.querySelector('#phase').value = '';
	document.querySelector('#name').value = '';
	fetchAll('http://localhost:3000/api/test');
};

const handleSubmit = e => {
	e.preventDefault();
	const test = {
		id: document.querySelector('#id').value,
		phase: document.querySelector('#phase').value,
		name: document.querySelector('#name').value
	};
	create('http://localhost:3000/api/test', test);
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
	fetchAll('http://localhost:3000/api/test');
	document.querySelector('.submit').addEventListener('click', handleSubmit);
};
init();
