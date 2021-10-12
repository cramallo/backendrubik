const User = require('../models/user');

const verifySignUpUser = async (req, res, next) => {
    try {
        const emailExists = await User.findOne({ email: req.body.email });
        //req.user = user;
        if(emailExists) return res.status(400).send('Email already exists')
        next();
    } catch (err) {
        return res.status(400).send('Email already exists')
    }
}

const verifySignInUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        req.user = user;
        if(!user) return res.status(400).send('Wrong user');
        next();
    } catch (err) {
        return res.status(500).send('Fail finding user');
    }
}

module.exports.verifySignUpUser = verifySignUpUser;
module.exports.verifySignInUser = verifySignInUser;
