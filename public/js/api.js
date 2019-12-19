console.log('api.js');

const update = async (url, data) => {
	const r = await fetch(url, getOptions('put', data));
	return await r.json();
};

const post = (url, data) => {
	fetch(url, getOptions('post', data));
};

const get = async url => {
	const r = await fetch(url);
	return await r.json();
};

const remove = (url, data) => {
	fetch(url, getOptions('delete', data));
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
