console.log('heyhey');

const handleClickAdd = e => {
	const movie = e.currentTarget.dataset.movie;

	console.log(psid);
	const stemmingBody = {
		film: movie
	};
	post(`/api/stemming/${psid}`, stemmingBody);
};

const init = () => {
	const addBtns = document.querySelectorAll('.stemmingMovieAdd');
	addBtns.forEach(btn => {
		btn.addEventListener('click', handleClickAdd);
	});
};
init();
