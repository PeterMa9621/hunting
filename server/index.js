const Database = require('./util/database/database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

const restaurant = require('./routes/api/restaurant');

app.use('/api/restaurant', restaurant);

