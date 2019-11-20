const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
// const path = require('path');
// const ejs = require('ejs');
const cors = require('cors');

// const Store = require('./store/Store.js');
const Database = require('./Database.js');
require('dotenv').config();

app.use(morgan('short'));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const db = new Database();
let tests;

getTests = async () => {
	return db.getAll();
};

saveTests = async data => {
	db.setAll(data);
	await db.getAll();
};

app.get('/', (req, res) => {
	res.render(__dirname + '/public/views/index');
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
