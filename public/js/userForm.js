let $textArea = document.querySelector('textarea');
let characterCount = document.querySelector('.characterCount');
const $submitBtn = document.querySelector('.submit');
const $suggestieTitle = document.querySelector('#suggestieTitle');
const $suggestieLink = document.querySelector('#suggestieLink');

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

const handleTextChange = e => {
	const inputAmount = e.currentTarget.value.length;
	characterCount.innerHTML = `Resterende aantal tekens: ${$textArea.maxLength -
		inputAmount}`;
};

const handleSubmitClick = async e => {
	console.log($suggestieTitle.value);
	console.log($textArea.value);
	console.log($suggestieLink.value);
	const reqBody = {
		suggestion: {
			title: $suggestieTitle.value,
			desc: $textArea.value,
			link: $suggestieLink.value
		}
	};
	await post(`${url}/api/suggesties/${soort}s/${psid}`, reqBody);
	MessengerExtensions.requestCloseBrowser(
		(success = async () => {
			//sluit browser
		}),
		(error = err => {
			console.log(err);
		})
	);
};

const init = () => {
	loadMessengerSDK(document, 'script', 'Messenger');
	console.log(soort);
	console.log(url);
	characterCount.innerHTML = `Resterende aantal tekens: ${$textArea.maxLength}`;
	$textArea.addEventListener('input', handleTextChange);
	$submitBtn.addEventListener('click', handleSubmitClick);
};
init();
