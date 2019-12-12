let $textArea = document.querySelector('textarea');
let characterCount = document.querySelector('.characterCount');
const $submitBtn = document.querySelector('.submit');
const $suggestieTitle = document.querySelector('#suggestieTitle');
const $suggestieLink = document.querySelector('#suggestieLink');

const handleTextChange = e => {
	const inputAmount = e.currentTarget.value.length;
	characterCount.innerHTML = `Resterende aantal tekens: ${$textArea.maxLength -
		inputAmount}`;
};

const handleSubmitClick = e => {
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
	post(`${url}/api/suggesties/${soort}s/${psid}`, reqBody);
};

const init = () => {
	console.log(soort);
	console.log(url);
	characterCount.innerHTML = `Resterende aantal tekens: ${$textArea.maxLength}`;
	$textArea.addEventListener('input', handleTextChange);
	$submitBtn.addEventListener('click', handleSubmitClick);
};
init();
