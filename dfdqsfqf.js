'use strict';

const options = {
	client: 'mysql2',
	connection: {
		host: 'ID276017_cinematjes.db.webhosting.be',
		user: 'ID276017_cinematjes',
		password: 'cinematjes-19',
		database: 'ID276017_cinematjes'
	},
	pool: { min: 0, max: 20 }
};

module.exports = options;
