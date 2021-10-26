const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const {config} = require('../helpers/constants');
const httpErrors = require('./helpers/httpErrors');

const router = Router();

router.post(
    '/auth/reg',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Password is not correspond to safety required').isLength({ min: 6 })
    ],
    regUser);

    router.post('/auth/login',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Password does not correspond to safety required').isLength({ min: 6 })
    ],
    loginUser);

async function regUser(req, res) {
    try {
        checkValidation(req);
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });

        if  (userExists) {
            return res.status(400).json({ message: 'User with such email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'New user has been created' });


    } catch (e) {
        return httpErrors._500(res);
    }
}

async function loginUser(req, res) {
    try {
        checkValidation(req);
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: 'Wrong credentials. Please, try again.' })
        }

        const isPasswordMatch = bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(403).json({ message: 'Wrong credentials. Please, try again.' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.jwtKey,
            { expiresIn: '1h' }
        )

        return res.status(200).json({ message: 'Successfully authenticated', token })
    } catch (e) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

function checkValidation (req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Validation error'
        }) 
    }
}

module.exports = router;
