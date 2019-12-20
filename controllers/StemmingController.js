const StemmingDAO = require('../DAO/StemmingDAO.js');
const SelectionDAO = require('../DAO/SelectionDAO.js');

module.exports = class StemmingController {
	static setStemming = async (psid, movie) => {
		const finalBody = {
			psid: psid,
			movieId: movie
		};
		StemmingDAO.setStemming(finalBody);
	};

	static getVotes = async () => {
		let final = [];
		let countObject = {};
		let idArray = [];
		const stemming = await StemmingDAO.getVotes();
		stemming.forEach(vote => {
			idArray.push(vote.movieId);
		});
		let countFunc = keys => {
			countObject[keys] = ++countObject[keys] || 1;
		};
		idArray.forEach(countFunc);
		for (let prop in countObject) {
			const movie = await SelectionDAO.getInfo(prop);
			const object = {
				film: movie,
				votes: countObject[prop]
			};
			final.push(object);
		}
		return final;
	};

	static getHighestVotes = objects => {
		let count = 0;
		let highestVotes = [];
		objects.forEach(object => {
			console.log(object.votes);
			if (object.votes > count) {
				count = object.votes;
				highestVotes[0] = object;
			}
		});
		return highestVotes;
	};

	static getOccurence = (array, value) => {};
};
