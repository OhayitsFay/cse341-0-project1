const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello World');
});
const contactsRoutes = require('./contacts');

router.use('/contacts', contactsRoutes);

module.exports = router;