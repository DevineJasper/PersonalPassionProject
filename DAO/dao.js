config = require('../services/config');
'use strict';

const DAO = {
	client: 'mysql2',
	connection: {
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database
	},
	pool: { min: 0, max: 20 }
};

module.exports = DAO;
