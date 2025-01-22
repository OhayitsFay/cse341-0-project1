const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

// GET /feed/posts
router.get('/contacts', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById)
// localhost:8080/contacts/
module.exports = router;