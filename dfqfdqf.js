'use strict';
const mysql = require('mysql2/promise');

class DAO {
	constructor() {
		this.connection;
	}

	connect = async () => {
		this.connection = await mysql.createPool({
			// socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
			host: 'ID276017_cinematjes.db.webhosting.be',
			user: 'ID276017_cinematjes',
			password: 'cinematjes-19',
			database: 'ID276017_cinematjes',
			connectionLimit: 10,
			queueLimit: 0
		});
		console.log('db connected..');
	};

	getAll = async () => {
		let [result] = await this.connection.execute('SELECT * FROM `test-table`');
		return await result;
	};

	disconnect = () => {
		console.log('close connection');
		this.connection.end();
	};
}

// con.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });

module.exports = DAO;
