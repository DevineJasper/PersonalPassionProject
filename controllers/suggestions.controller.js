const Movie = require('../models/suggestion.model');
const DAO = require('../DAO');

class MoviesDAO extends DAO {
	constructor() {
		super();
	}

	setMovieSuggestion = async data => {
		// console.log(data);
		// const psId = parseInt(data.psId);
		// let allSuggestions = [];
		// data.movieId.forEach(async id => {
		// 	const movie = new Movie(psId, id);
		// 	const movieObject = {
		// 		id: movie.id,
		// 		psId: movie.psId,
		// 		movieId: movie.movieId
		// 	};
		// 	allSuggestions.push(movieObject);
		// });
		// const sql = 'INSERT INTO `MovieSuggestions` ?';
		// const values = allSuggestions;
		// await this.connection.query(sql, values);
		const movie = new Movie(data);
		await this.connection.execute(
			'INSERT INTO `MovieSuggestions` VALUES(?, ?, ?)',
			[movie.id, movie.psId, movie.movieId]
		);
	};

	getMovieSuggestions = async psId => {
		console.log(psId);
		let [
			result
		] = await this.connection.execute(
			'SELECT `movieId` FROM `MovieSuggestions` WHERE `psId` = ?',
			[psId]
		);
		let filteredArray = [];
		result.forEach(object => {
			filteredArray.push(object.movieId);
		});
		return await filteredArray;
	};

	changeMovieSuggestions = async data => {
		let unchanged = [];
		console.log(data);
		const psId = data.psId;
		const originals = data.original;
		const recents = data.new;
		if (recents.length > originals.length) {
			originals.forEach(original => {
				recents.forEach(recent => {
					if (recent == original) {
						unchanged.push(recent);
					}
				});
			});
		} else if (recents.length < originals.length) {
			recents.forEach(recent => {
				originals.forEach(original => {
					if (original == recent) {
						unchanged.push(original);
					}
				});
			});
		}
		console.log(`ongewijzigd: ${unchanged}`);
		// 	let [
		// 		result
		// 	] = await this.connection.execute(
		// 		'SELECT `movieId` FROM `MovieSuggestions` WHERE `psId` = ?',
		// 		[psId]
		// 	);
		// 	let filteredArray = [];
		// 	result.forEach(object => {
		// 		filteredArray.push(object.movieId);
		// 	});
		// 	return await filteredArray;
	};

	deleteMovieSuggestions = async data => {
		console.log(data);
		// const psId = data.psId;
		// const movieId = data.movieId;
		// await this.connection.execute(
		// 	'DELETE FROM `MovieSuggestions` WHERE `psId` = ? AND `movieId` = ?',
		// 	[psId, movieId]
		// );
	};
}

module.exports = MoviesDAO;
