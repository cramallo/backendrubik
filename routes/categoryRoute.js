const Category = require('../models/category');
const router = require('express').Router();

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create Category
 *     tags: [categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/dtos/CategoryDTO'
 *     responses:
 *       200:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */


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

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [categories]
 *     responses:
 *       200:
 *         description: The categories were returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */

router.get('/', async (req, res) => {
    
    try {
        const savedService = await Category.find().limit(10);
        res.send(savedService);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
