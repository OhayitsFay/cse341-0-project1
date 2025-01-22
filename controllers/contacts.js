const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');


const getAllContacts = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').find();
        result.toArray().then((list)=> {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);

        });
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};
const getContactById = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
        result.toArray().then((contacts) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(contacts[0]);
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    
    }
}

module.exports = {
    getAllContacts,
    getContactById,
};