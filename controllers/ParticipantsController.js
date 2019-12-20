const ParticipantsDAO = require('../DAO/ParticipantsDAO');

module.exports = class ParticipantsController {
	static getUsers = async => {
		const users = ParticipantsDAO.getAll();
		return users;
	};

	static getUsersByPhase = async phase => {
		const users = ParticipantsDAO.getPhase(phase);
		return users;
	};

	static setUser = async user => {
		ParticipantsDAO.setUser(user);
	};

	static getVolunteers = async () => {
		const volunteers = await ParticipantsDAO.getVolunteers();
		return await volunteers;
	};

	static updateParticipantPhase = async (fase, id) => {
		ParticipantsDAO.setParticipantPhase(fase, id);
	};

	static setVolunteer = async id => {
		await ParticipantsDAO.setVolunteer(id);
	};

	static removeVolunteer = async id => {
		await ParticipantsDAO.removeVolunteer(id);
	};

	static updateChecked = async (id, value) => {
		await ParticipantsDAO.updateChecked(id, value);
	};
};
