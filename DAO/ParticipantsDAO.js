const DAO = require('./dao');
const knex = require('knex')(DAO);
const User = require('../services/user');
const GraphAPI = require('../services/graph-api');

module.exports = class ParticipantsDAO {
	static setUser = async user => {
		await knex.from(`Participants`).insert({
			psId: user.psid,
			firstName: user.firstName,
			lastName: user.lastName,
			fase: 0,
			vrijwilliger: 0
		});
	};

	static getPhase = async phase => {
		let result = [];
		await knex
			.from(`Participants`)
			.select(`psId`)
			.where({ fase: phase })
			.then(r =>
				r.forEach(object => {
					result.push(object.psId);
				})
			);
		return result;
	};

	static getAll = async () => {
		let result = [];
		await knex
			.from(`Participants`)
			.select(`*`)
			.then(r => (result = r));
		return result;
	};

	static setVolunteer = async id => {
		await knex
			.from(`Participants`)
			.update({ vrijwilliger: 1 })
			.where({ psId: id });
	};

	static getVolunteers = async () => {
		let volunteers;
		await knex
			.from(`Participants`)
			.select('*')
			.where({ vrijwilliger: 1 })
			.then(r => {
				volunteers = r;
			});
		return await volunteers;
	};

	static getUserProfile = async data => {
		// console.log(data);
		let user = new User(data);
		GraphAPI.getUserProfile(data)
			.then(userProfile => {
				user.setProfile(userProfile);
			})
			.catch(error => {
				console.log('Profile is unavailable:', error);
			})
			.finally(() => {
				return user;
			});
	};
};
