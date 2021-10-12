const Plan = require('../models/plan');
const router = require('express').Router();

router.post('/', async (req, res) => {

    const plan = new Plan({
        _id: req.body._id,
        name: req.body.name,
        priority: req.body.priority,
        points: req.body.points,
        price: req.body.price,
        days: req.body.days
    });

    try {
        const savedPlan = await plan.save();
        res.send(savedPlan);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {

    try {
        const foundPlan = await Plan.findById(req.params.id);
        res.send(foundPlan);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

module.exports = router;
