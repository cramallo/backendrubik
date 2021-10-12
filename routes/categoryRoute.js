const Category = require('../models/category');
const router = require('express').Router();

router.post('/', async (req, res) => {

    const category = new Category({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        mainImage: req.body.mainImage
    });

    try {
        const savedCategory = await category.save();
        res.send(savedCategory);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

router.get('/', async (req, res) => {
    
    try {
        const savedService = await Category.find().limit(10);
        res.send(savedService);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
