const { observable, decorate } = require('mobx');
const Database = require('../Database.js');

class Store {
	tests;
	constructor() {
		this.db = new Database();
	}

	getTests = async () => {
		this.db.getAll().then(d => );
	}
}

decorate(Store, {
	tests: observable
});

module.exports = Store;
