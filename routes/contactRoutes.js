const express = require('express');
const {getContacts, createContact, getContact, updateContact, deleteContact} = require('../controller/contactController');
const tokenValidation = require('../middleware/validationTokenHandler');

const router = express.Router()

// to implement tokent validation on CRUD operations
router.use(tokenValidation);

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router