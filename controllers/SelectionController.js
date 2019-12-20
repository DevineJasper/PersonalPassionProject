const SelectionDAO = require('../DAO/SelectionDAO.js');

module.exports = class SelectionController {
	static setMovieSelection = async movies => {
		let finalMovies = [];
		movies.forEach(movie => {
			const finalMovie = {
				movieId: movie.id,
				title: movie.original_title,
				vote_average: movie.vote_average,
				release_date: movie.release_date,
				overview: movie.overview,
				poster_path: movie.poster_path
			};
			finalMovies.push(finalMovie);
		});
		SelectionDAO.setMovieSelection(finalMovies);
	};

	static getMovieSelection = async () => {
		const movies = SelectionDAO.getMovieSelection();
		return movies;
	};
};
