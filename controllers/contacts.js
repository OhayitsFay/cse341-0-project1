const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');


const getAllContacts = async (req, res) => {
    //#swagger.tags=['Users']
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
    //#swagger.tags=['Users']
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
};
const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').insertOne(user);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add contact' });
    }
};
const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    console.log(`Updating user with ID: ${userId}`, req.body); // Log incoming request data
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(200).json({ message: 'Contact updated successfully' });
    } else {
        console.error(`Failed to update user with ID: ${userId}`, response.error); // Log error
        res.status(500).json(response.error || 'User not updated');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.status(204).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createUser,
    updateUser,
    deleteUser
};