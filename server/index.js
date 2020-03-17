const Database = require('./util/database/database');
const express = require('express');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

const users = require('./routes/api/users');

app.use('/api/users', users);

