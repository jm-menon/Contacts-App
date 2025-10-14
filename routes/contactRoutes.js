const express = require('express');
const router = express.Router();

const {getContacts, getContactId, createContactId, updateContactId, deleteContactId} = require('../controllers/contactControllers');
const validateTokenHandler = require('../middleware/validateTokenHandler');


router.use(validateTokenHandler);

router.route('/').get(getContacts).post(createContactId);

router.route('/:id').get(getContactId).put(updateContactId)

router.route('/:id').delete(deleteContactId);

module.exports = router;