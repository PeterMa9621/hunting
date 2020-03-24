const express = require('express');
const Database = require('../../util/database/database');
const Util = require('../../util/Util');
const router = express.Router();

const tableName = "news";

// Get all news
router.get('/', async (req, res) => {
    const database = await Database.getInstance();
    const result = await database.find({}, tableName, {by:'created_at', order:'DESC'});

    res.status(200);
    res.send(result);
});

// Get a news
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const database = await Database.getInstance();
    const result = await database.find({id: id }, tableName);

    res.status(200);
    res.send(result);
});

// Add a news
router.post('/', async (req, res) => {
    const body = req.body;
    //console.log(body);
    const database = await Database.getInstance();

    const result = await database.insert({
        title: body.title,
        content: body.content,
        author: body.author,
        created_at: new Date(),
        updated_at: new Date(),
        category: body.category
    }, "news");

    if(result !== false){
        res.status(201);
        res.send(result);
    } else {
        res.status(500);
        res.send('Error when adding news');
    }
});

// Update a news
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    body['updated_at'] = Util.getMySQLFormatDateTime();
    const database = await Database.getInstance();
    const result = await database.update({ id:id }, body, tableName);

    if(result.result.n !== 0){
        res.status(200).send(result);
    } else {
        res.status(500).send({error: "Error when editing news"});
    }
});

// Delete a news
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const database = await Database.getInstance();
    const result = await database.delete({ id: id }, tableName);
    res.status(200);
    res.send(result);
});

module.exports = router;