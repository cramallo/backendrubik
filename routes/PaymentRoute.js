const Payment = require('../models/payment');
const router = require('express').Router();

/**
 * @swagger
 * /payments/:userId:
 *   get:
 *     summary: Get Payments by userId
 *     tags: [payments]
 *     parameters:
 *       - in : path
 *         name: userId
 *         description: id of user
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Payments found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 */

router.get('/:userId', async (req, res) => {
    try {
        const payment = await Payment.find({user: req.params.userId});
        res.send(payment);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /payments/:userId:
 *   post:
 *     summary: Add payment method for user
 *     tags: [payments]
 *     parameters:
 *       - in : path
 *         name: userId
 *         description: id of user
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/dtos/PaymentDTO'
 *     responses:
 *       200:
 *         description: The payment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 */

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
