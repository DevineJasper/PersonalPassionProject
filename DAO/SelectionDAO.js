const DAO = require('./dao');
const knex = require('knex')(DAO);

module.exports = class SelectionDAO {
	static setMovieSelection = async movies => {
		console.log(movies);
		knex
			.from(`SelectionMovies`)
			.insert(movies)
			.then(() => console.log('succes'))
			.catch(error => console.log(error));
	};

	static getMovieSelection = async () => {
		let movies;
		await knex
			.from(`SelectionMovies`)
			.select('*')
			.then(r => (movies = r))
			.catch(error => console.log(error));
		return movies;
	};

	static getInfo = async id => {
		let movie;
		await knex
			.from(`SelectionMovies`)
			.select('*')
			.where({ movieId: id })
			.then(r => (movie = r[0]));
		return movie;
	};
};
