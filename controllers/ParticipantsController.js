const DAO = require('../DAO/dao');
const ParticipantsDAO = require('../DAO/ParticipantsDAO');
const request = require('request');
const knex = require('knex')(DAO);

module.exports = class ParticipantsController {
	static getUsers = async => {
		const users = ParticipantsDAO.getAll();
		return users;
	};

	static setUser = async user => {
		ParticipantsDAO.setUser(user);
	};

	static getVolunteers = async () => {
		const volunteers = await ParticipantsDAO.getVolunteers();
		return await volunteers;
	};

	static setVolunteer = async id => {
		await ParticipantsDAO.setVolunteer(id);
	};
};
