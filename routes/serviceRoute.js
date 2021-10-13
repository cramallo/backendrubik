const Service = require('../models/service');
const router = require('express').Router();

/**
 * @swagger
 * /service:
 *   post:
 *     summary: Create Service
 *     tags: [services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /service/:id:
 *   get:
 *     summary: Get Service by Id
 *     tags: [services]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of service
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       500:
 *         description: Server error
 */

router.get('/:id', async (req, res) => {

    try {
        const savedService = await Service.findById(req.params.id).populate("category");
        res.send(savedService);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /service/category/:id:
 *   get:
 *     summary: Get Services by categoryId
 *     tags: [services]
 *     parameters:
 *       - in : path
 *         name: categoryId
 *         description: id of category
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Services found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Service'
 *       500:
 *         description: Server error
 */

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
