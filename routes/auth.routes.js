const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const {config} = require('../helpers/constants');
const {getHttpRes} = require('../helpers/get-http-res');

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

        if (userExists) {
            return getHttpRes(400, res, { message: 'User with such email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        
        return getHttpRes(201, res);


    } catch (e) {
        return getHttpRes(500, res);
    }
}

async function loginUser(req, res) {
    try {
        checkValidation(req);
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return getHttpRes(403, res);
        }

        const isPasswordMatch = bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return getHttpRes(403, res);
        }

        const token = jwt.sign(
            { userId: user.id },
            config.jwtKey,
            { expiresIn: '1h' }
        )

        return getHttpsRes(200, res, { token })
    } catch (e) {
        return getHttpsRes(500, res);
    }
}

function checkValidation (req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return getHttpRes(400, res, {
            errors: errors.array(),
            message: 'Validation error'
        }) 
    }
}

module.exports = router;
