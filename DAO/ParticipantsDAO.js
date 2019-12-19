const DAO = require('./dao');
const knex = require('knex')(DAO);
const User = require('../services/user');
const GraphAPI = require('../services/graph-api');

module.exports = class ParticipantsDAO {
	static setUser = async user => {
		await knex.from(`Participants`).insert({
			psid: user.psid,
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
			.select(`psid`)
			.where({ fase: phase })
			.then(r => (result = r));
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
			.where({ psid: id });
	};

	static setParticipantPhase = async (phase, id) => {
		await knex
			.from(`Participants`)
			.update({ fase: phase })
			.where({ psid: id });
	};

	static removeVolunteer = async id => {
		await knex
			.from(`Participants`)
			.update({ vrijwilliger: 0 })
			.where({ psid: id });
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

	static updateChecked = async (id, value) => {
		knex
			.from(`Participants`)
			.update({ checked: value })
			.where({ psid: id })
			.then(console.log('succes!'));
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
