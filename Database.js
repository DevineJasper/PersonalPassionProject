'use strict';
const mysql = require('mysql2/promise');
// const mysql = require('mysql');

class Database {
	constructor() {
		this.connection;
		this.connect();
	}

	connect = async () => {
		this.connection = await mysql.createConnection({
			socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
			host: 'localhost',
			user: 'nodesql',
			password: 'nodesql',
			database: 'nodesqltest'
		});
		console.log('Database connectie...');
	};

	getAll = async () => {
		let [result] = await this.connection.execute('SELECT * FROM `test-table`');
		return await result;
	};

	setAll = async data => {
		console.log(data);
		const sql = 'INSERT INTO `test-table` VALUES(?, ?, ?)';
		this.connection.execute(sql, [data.id, data.phase, data.name]);
		this.getAll();
	};
}

// con.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });

module.exports = Database;