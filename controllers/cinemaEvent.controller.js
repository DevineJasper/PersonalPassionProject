const DAO = require('../DAO/dao');
const knex = require('knex')(DAO);

class CinemaEventDAO {
	constructor() {}

	setEvent = async data => {
		console.log('in dao');
		const edit = { fase: data.fase };
		await knex(`CinemaEvent`)
			.where({ id: 1 })
			.update(edit);
	};
}
module.exports = CinemaEventDAO;
