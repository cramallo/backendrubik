const Payment = require('../models/payment');
const router = require('express').Router();

router.get('/:userId', async (req, res) => {
    try {
        const payment = await Payment.find({user: req.params.userId});
        res.send(payment);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

router.post('/:userId', async (req, res) => {
    const payment = new Payment({
        user: req.params.userId,
        number: req.body.number,
        cvv: req.body.cvv,
        name: req.body.name,
        expirationDate: req.body.expirationDate
    });

    try {
        const paymentSaved = await payment.save();
        res.send(paymentSaved);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

module.exports = router;
