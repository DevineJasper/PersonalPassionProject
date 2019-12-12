const StemmingDAO = require('../DAO/StemmingDAO.js');
const SelectionDAO = require('../DAO/SelectionDAO.js');
// const request = require('request');
const fetch = require('node-fetch');

module.exports = class StemmingController {
	static setStemming = async (psid, movie) => {
		const finalBody = {
			psid: psid,
			movie_id: movie
		};
		StemmingDAO.setStemming(finalBody);
	};

	static getVotes = async () => {
		let final = [];
		let countObject = {};
		let idArray = [];
		const stemming = await StemmingDAO.getVotes();
		stemming.forEach(vote => {
			idArray.push(vote.movie_id);
		});
		console.log(idArray);
		let countFunc = keys => {
			countObject[keys] = ++countObject[keys] || 1;
		};
		idArray.forEach(countFunc);
		console.log(countObject);
		for (let prop in countObject) {
			console.log(countObject[prop]);
			const movie = await SelectionDAO.getInfo(prop);
			const object = {
				film: movie,
				votes: countObject[prop]
			};
			final.push(object);
		}
		console.log(final);
		return final;
	};

	static getOccurence = (array, value) => {};
};
