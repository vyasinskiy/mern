const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
    '/auth/reg',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Password is not correspond to safety required').isLength({ min: 6 })
    ],
    regUser);
router.post('/auth/signin', signInUser);

async function regUser(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Validation error'
            }) 
        }
        const { email, password } = req.body;
        const isEmailUsed = await User.findOne({ email });

        if (isEmailUsed) {
            return res.status(400).json({ message: 'User with such email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'New user has been created' });


    } catch (e) {

    }

}

async function signInUser(req, res) {

}

module.exports = router;
