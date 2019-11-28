const DAO = require('./dao');
const knex = require('knex')(DAO);

module.exports = class ParticipantsDAO {
	static setEvent = async data => {
		console.log('in dao');
		const edit = { fase: data.fase };
		await knex(`CinemaEvent`)
			.where({ id: 1 })
			.update(edit);
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
};
