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
    const contactsId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').findOne({_id: contactsId });
        res.setHEader('Content-Type', 'application/json');
        res.status(200).Json (result);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};

module.exports = {
    getAllContacts,
    getContactById
};