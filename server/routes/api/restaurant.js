const express = require('express');
const Database = require('../../util/database/database');

const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
    const restaurant = await getCollection();
    const result = await restaurant.find({}).toArray();

    res.send(result);
});

// Add a restaurant
router.post('/', async (req, res) => {
    console.log(req.body.text);
    /*
    getCollection().insertOne({

    })

     */
});

async function getCollection(){
    const client = await Database.getInstance();

    return await client.db('hunting').collection('restaurant');
}

module.exports = router;