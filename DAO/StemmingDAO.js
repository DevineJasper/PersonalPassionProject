const DAO = require('./dao');
const knex = require('knex')(DAO);

module.exports = class StemmingDAO {
	static setStemming = async data => {
		await knex
			.from(`MovieStemming`)
			.insert(data)
			.then(() => console.log('succes'));
	};

	static getVotes = async () => {
		let result;
		await knex
			.from(`MovieStemming`)
			.select('*')
			.then(r => (result = r));
		return result;
	};
};
