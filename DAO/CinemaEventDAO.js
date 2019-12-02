const DAO = require('./dao');
const knex = require('knex')(DAO);

module.exports = class CinemaEventDAO {
	static setEventPhase = async phase => {
		await knex(`CinemaEvent`)
			.where({ id: 1 })
			.update({ fase: phase });
	};

	static getEventPhase = async () => {
		let currentPhase;
		await knex
			.from(`CinemaEvent`)
			.where({ id: 1 })
			.select(`fase`)
			.then(r => {
				r.forEach(TextRow => {
					currentPhase = TextRow.fase;
				});
			});
		return currentPhase;
	};
};
