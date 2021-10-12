const Subscription = require('../models/subscription');
const Plan = require('../models/plan');
const User = require('../models/user');
const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

// Subscription plan 

router.post('/service/:serviceId', [verifyToken], async (req, res) => {

    const date = Date.now();

    const user = await User.find({ email: req.body.user });

    console.log("useeeeer");
    console.log(user);

    const subscription = new Subscription({
        _id: req.body.id,
        user: user._id,
        service: req.params.serviceId,
        plan: req.body.plan,
        startedDate: date,
        expirationDate: calculateExpirationDate(req.body.plan, date)
    });
    
    try {
        const savedSubscription = await subscription.save().populate("plan");

        //const plan = Plan.findById(req.body.plan);
        user.points = user.points - subscription.plan.points;
        await user.save();

        res.send(savedSubscription);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

// Actualizar status de suscripcion (paid, cancelled, available para renovacion)

router.put('/service/:serviceId', [verifyToken], async (req, res) => {

    const user = req.body.user;
    
    try {
    const subscription = Subscription.find({service: req.params.serviceId, user: req.body.user._id}).populate("plan");

    subscription.status = req.body.status;
    
    if(Date.now() < subscription.expirationDate && subscription.status == "CANCELLED") {
        subscription.next_period_available = false;
        user.points = user.points - subscription.plan.points;
        await user.save();
    }

    const savedSubscription = await subscription.save();
    res.send(savedSubscription);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const foundSubscription = await Subscription.findById(req.params.id);
        res.send(foundSubscription);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

async function calculateExpirationDate(planId, startedDate) {
    const plan = await Plan.findById(planId);
    console.log("entro a calculate");
    try {
        if(plan) {
            return startedDate + plan.days;
        }
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
}

module.exports = router;
