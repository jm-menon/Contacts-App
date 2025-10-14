// ...existing code...
const express = require('express');
const router = express.Router();
const { registerUsers, loginUsers, currentUsers } = require('../controllers/userController');
const validateTokenHandler = require('../middleware/validateTokenHandler');
//router.route('/register').post(registerUser);
//router.route('/login').post(loginUser);
//router.route('/current').get(protect, currentUser);

router.post('/register', registerUsers);
//router.post('/register', (req, res) => {
  //console.log('inline handler hit, body:', req.body);
  //res.status(200).json({ ok: true });
//});

router.post('/login', loginUsers);

router.get('/current', validateTokenHandler, currentUsers);

module.exports = router;
// ...existing code...