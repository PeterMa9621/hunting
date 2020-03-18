const express = require('express');
const mongodb = require('mongodb');
const Database = require('../../util/database/database');

const router = express.Router();

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
    const result = await database.find({ _id: new mongodb.ObjectID(id) }, "users");

    res.status(200);
    res.send(result);
});

// Add a user
router.post('/', async (req, res) => {
    const body = req.body;
    const database = await Database.getInstance();

    const doc = {
        username: body.username,
        email: body.email,
        created_at: new Date(),
        updated_at: new Date()
    };

    const result = await database.insert(doc,"users", {username: body.username});
    if(result !== false){
        res.status(201);
        res.send(result);
    } else {
        res.status(500);
        res.send('Error when add users');
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
     const id = req.params.id;
     const database = await Database.getInstance();
     const result = await database.delete({ _id: new mongodb.ObjectID(id) }, "users");
     res.status(200);
     res.send(result);
});

async function getCollection(){
    const client = await Database.getInstance();

    return await client.db('hunting').collection('users');
}

module.exports = router;