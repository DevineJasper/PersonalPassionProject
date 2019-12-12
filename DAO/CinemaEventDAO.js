const DAO = require('./dao');
const knex = require('knex')(DAO);

module.exports = class CinemaEventDAO {
	static updateDates = async dates => {
		await knex(`CinemaEvent`)
			.where({ id: 1 })
			.update({
				startSuggesties: dates.startSuggesties,
				endSuggesties: dates.endSuggesties,
				startStemming: dates.startStemming,
				endStemming: dates.endStemming,
				filmAvond: dates.filmAvond
			});
	};

	static getDates = async () => {
		let dates;
		await knex(`CinemaEvent`)
			.where({ id: 1 })
			.select(
				`startSuggesties`,
				`endSuggesties`,
				`startStemming`,
				`endStemming`,
				`filmAvond`
			)
			.then(r => (dates = r[0]));
		return dates;
	};

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
