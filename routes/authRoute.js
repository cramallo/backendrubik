const User = require('../models/user');
const Professional = require('../models/professional');
//const authController = require('../controllers/auth');
const router = require('express').Router();

const verifybody = require('../middlewares/verifyBody');
const verifyUser = require('../middlewares/verifyUser');

// mover a otra clase

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sendGrid = require('@sendgrid/mail');

router.post('/signup/professional', [verifybody.signUpProfessionalValidation, verifyUser.verifySignUpUser], async (req, res) => {
    const user = await saveUser(req, 'PROFESSIONAL');
    const professional = new Professional({
        _id: user._id,
        user: user._id,
        monotax: req.body.monotax
    });

    try {

        const professionalSaved = await professional.save(professional);

        const responseDto = {
            userData: user,
            professionalData: professionalSaved
        };

        res.send(responseDto);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/signup', [verifybody.signUpValidation, verifyUser.verifySignUpUser], async (req, res) => {
    const user = await saveUser(req, 'BASIC');
    res.send(user);
});

async function saveUser(req, role) {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.email,
        email: req.body.email,
        dni: req.body.email,
        cuit: req.body.cuit,
        state: req.body.email,
        city: req.body.email,
        neighborhood: req.body.neighborhood,
        address: req.body.email,
        phone: req.body.email,
        password: hashPassword,
        billVoucher: req.body.billVoucher,
        role: role
    });

    console.log(process.env.SECRET_EMAIL);

    try {
        const savedUser = await user.save();
        /*await sendGrid.send({
            to: {
                email: user.email,
                name: user.name
            },
            from: {
                email: process.env.SECRET_EMAIL,
                name: user.name
            },
            templateId: 'd-d80f360ebe4744a38e2ad6ddb5e0691c',
            dynamicTemplateData: {
                name: user.name
            }
        })
        res.send(savedUser);*/
        return savedUser;
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

router.post('/signin', [verifybody.logInValidation, verifyUser.verifySignInUser], async (req, res) => {
    const user = req.user;

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET);

    res.header('token', token).send(user);
});

module.exports = router;
