const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();

app.use(morgan('short'));

app.get('/', (req, res) => {
  res.json({message: 'up and running'});
});

require('./routes/auth.routes.js')(app);
require('./database.js');
require('./chatbot.js');

app.listen(process.env.PORT, () => {
  console.log(`Server luistert op poort ${process.env.PORT}`);
});
