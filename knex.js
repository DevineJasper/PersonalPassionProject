let knex = require('knex')({
	client: 'mysql',
	connection: {
		host: 'ID276017_cinematjes.db.webhosting.be',
		user: 'ID276017_cinematjes',
		password: 'cinematjes-19',
		database: 'ID276017_cinematjes'
	},
	pool: { min: 0, max: 20 }
});
