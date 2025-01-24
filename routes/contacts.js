const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

// GET /feed/posts
router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactsController.createUser);
router.put('/:id', contactsController.updateUser); // Ensure this line is present
router.delete('/:id', contactsController.deleteUser); // Ensure this line is present
// localhost:8080/contacts/
module.exports = router;