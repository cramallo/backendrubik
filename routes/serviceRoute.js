const Service = require('../models/service');
const router = require('express').Router();

router.post('/', async (req, res) => {

    const service = new Service({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category
    });

    try {
        const savedService = await service.save();
        res.send(savedService);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {

    try {
        const savedService = await Service.findById(req.params.id).populate("category");
        res.send(savedService);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

router.get('/category/:id', async (req, res) => {

    try {
        const savedServices = await Service.find({category: req.params.id});
        res.send(savedServices);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

module.exports = router;
