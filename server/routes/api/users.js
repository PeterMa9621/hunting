const express = require('express');
const crypto = require('crypto');
const Util = require('../../util/Util');
const Database = require('../../util/database/database');

const router = express.Router();

const uuid = require('uuid');
//const uuidNameSpace = 'e9c37fe1-2492-4103-bfc7-d76063f8bdd0';

// Get all users
router.get('/', async (req, res) => {
    const database = await Database.getInstance();
    const result = await database.find({}, "users");

    res.status(200);
    res.send(result);
});

// Get a user
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const database = await Database.getInstance();
    const result = await database.find({ username: id }, "users");

    res.status(200);
    res.send(result);
});

// Update a user
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    body['updated_at'] = Util.getMySQLFormatDateTime();
    const database = await Database.getInstance();
    const result = await database.update({ username: id }, body, "users");
    if(result.result.n !== 0){
        res.status(200).send(result);
    } else {
        res.status(500).send({ error:'Error occurs when update users' });
    }

});

// Add a user
router.post('/', async (req, res) => {
    const body = req.body;
    if(body.username == null || body.username === '') {
        res.status(500).send('Username cannot be empty');
        return;
    }

    if(body.password == null || body.password === '' || body.password.length < 8) {
        //res.status(404);
        res.status(500).send('Password cannot be empty or it is too short');
        return;
    }

    const database = await Database.getInstance();

    const hash = crypto.createHash('sha256');
    hash.update(body.password);
    const hashPassword = hash.digest('hex');

    const currentDateTime = Util.getMySQLFormatDateTime();

    const doc = {
        username: body.username,
        email: body.email===undefined ? "" : body.email,
        created_at: currentDateTime,
        updated_at: currentDateTime,
        password: hashPassword,
        session: ''
    };

    const result = await database.insert(doc,"users", {username: body.username});
    if(result !== false){
        res.status(201).send(result);
    } else {
        res.status(500).send('Username has been registered');
    }
});

// Login
router.post('/login/', async (req, res) => {
    console.log("Login start");
    const startTime = new Date();

    const body = req.body;

    const username = body.username;
    const password = body.password;

    if(username == null){
        res.status(500).send("Username cannot be empty");
        return;
    }

    if(password == null){
        res.status(500).send("Password cannot be empty");
        return;
    }

    const database = await Database.getInstance();

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashPassword = hash.digest('hex');

    const result = await database.find({ username: username, password: hashPassword }, "users");

    if(result.length !== 0) {
        const uid = uuid.v4();
        console.log("UUID is", uid);
        await database.update({ username: username }, { session: uid }, "users");
        delete result[0].password;
        result[0]['session'] = uid;
        res.status(200);
        res.send(result);

        const endTime = new Date();
        console.log("Finish login request");
        console.log("Time used", Math.abs(startTime - endTime));
    } else{
        res.status(404).send("Username/password does not match anyone");
    }


});

// Check auth by session id
router.post('/auth', async (req, res) => {
    const body = req.body;
    const session = body.session;
    const username = body.username;
    const database = await Database.getInstance();
    const result = await database.find({ session:session, username:username }, "users");

    if(result.length !== 0){
        delete result[0].password;
        res.status(200).send(result);
    } else {
        res.status(404).send({ error:"Session and username does not match" });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
     const id = req.params.id;
     const database = await Database.getInstance();
     const result = await database.delete({ username: id }, "users");
     res.status(200);
     res.send(result);
});

module.exports = router;