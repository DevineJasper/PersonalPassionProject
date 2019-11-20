const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
// const Store = require('./store/Store.js');
const Database = require('./Database.js');
require('dotenv').config();
app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');

const db = new Database();
let tests;

getTests = async () => {
	return db.getAll();
};

saveTests = async data => {
	db.setAll(data);
};

app.get('/', (req, res) => {
	res.render(__dirname + '/public/views/index', { tests: tests });
});

app.get('/api/test', async (req, res) => {
	tests = await getTests();
	await console.log(tests);
	res.json(tests);
});

app.post('/api/test', async (req, res) => {
	const test = await {
		id: req.body.id,
		phase: req.body.phase,
		name: req.body.name
	};
	await saveTests(test);
	res.status(201).json({
		message: 'post test...',
		test: test
	});
});

// require('./routes/test.routes.js')(app);

// require('./routes/auth.routes.js')(app);
// require('./chatbot.js');

app.listen(process.env.PORT, () => {
	console.log(`Server luistert op poort ${process.env.PORT}`);
});
