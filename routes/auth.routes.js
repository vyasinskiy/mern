const {Router} = require('express');
const User = require('../models/User');
const router = Router();

router.post('/reg', regUser);
router.post('/signin', signInUser);

async function regUser(req, res) {

}

async function signInUser(req, res) {

}

module.exports = router;
