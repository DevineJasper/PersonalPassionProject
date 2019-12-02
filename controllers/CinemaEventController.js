const DAO = require('../DAO/dao');
const knex = require('knex')(DAO);
const CinemaEventDAO = require('../DAO/CinemaEventDAO');

module.exports = class CinemaEventController {
	static setEventPhase = phase => {
		CinemaEventDAO.setEventPhase(phase);
	};

	static getEventPhase = async () => {
		const currentPhase = await CinemaEventDAO.getEventPhase();
		return currentPhase;
	};
};
