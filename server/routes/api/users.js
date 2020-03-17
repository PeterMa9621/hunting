const express = require('express');
const mongodb = require('mongodb');
const Database = require('../../util/database/database');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await getCollection();
    const result = await users.find({}).toArray();

    res.status(200);
    res.send(result);
});

// Add a user
router.post('/', async (req, res) => {
    const body = req.body;
    const users = await getCollection();

    const result = await users.find({username: body.username}).toArray();
    if(result.length===0){
        await users.insertOne({
            username: body.username,
            email: body.email,
            created_at: new Date(),
            updated_at: new Date()
        });
        res.status(201);
        res.send('OK');
    } else {
        res.status(500);
        res.send('Duplicated username');
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
     const id = req.params.id;
     const users = await getCollection();
     await users.deleteOne({ _id: new mongodb.ObjectID(id) });
     res.status(200);
     res.send('OK');
});

async function getCollection(){
    const client = await Database.getInstance();

    return await client.db('hunting').collection('users');
}

module.exports = router;