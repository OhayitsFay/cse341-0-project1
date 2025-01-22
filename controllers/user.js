const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('user').find();
        result.toArray().then((user) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(user); // Return list
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('user').findOne({ _id: userId });
        result.toArray().then((user) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
};