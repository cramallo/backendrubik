const UserServiceSchema = require('../models/userService');
const ServiceSchema = require('../models/service');
const ProfessionalRatingSchema = require('../models/professionalRating');
const UserSchema = require('../models/user');
const router = require('express').Router();

const verifyUser = require('../middlewares/verifyUser');
const verifyToken = require('../middlewares/verifyToken');

const jwt = require('jsonwebtoken');

router.post('/', [verifyToken], async (req, res) => {

    console.log("user");
    console.log(req.user)

    const service = new UserServiceSchema({
        service: req.body.service,
        user: req.user._id,
        description: req.body.description,
        price: req.body.price,
        discount: {
            percentage: req.body.discount.percentage
        }
    });

    try {
        const savedService = await service.save();
        res.send(savedService);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const services = await ServiceSchema.find({category: req.query.category}, '_id');
        const savedServices = await UserServiceSchema.find({service: {$in: services}})
            .populate("user")
            .sort("points")
            .populate("service")
            .populate("professionalRating");

        const dtos = await buildDtos(savedServices);
        res.send(dtos);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/user/:profId', async (req, res) => {
    try {
        const savedServices = await UserServiceSchema.find({user: req.params.profId})
            .populate(  {
                path: 'service',
                model: 'Service',
                populate: {
                    path: 'category',
                    model: 'Category',
                    select: 'name'
                }
              }
            )

            res.send(savedServices);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

async function buildDtos(savedServices) {
    const dtos = [];
    for(savedService of savedServices) {
        const ratingFound = await ProfessionalRatingSchema.findOne({user: savedService.user._id});
        const userDto = await buildUserCategoryDto(savedService, ratingFound);
        console.log(userDto);
        dtos.push(userDto);
    }
    return dtos;
}

async function buildUserCategoryDto(savedService, ratingParam){
    return {
        _id: savedService._id,
        discount: savedService.discount.percentage,
        user: savedService.user,
        service: savedService.service,
        description: savedService.description,
        price: savedService.price,
        rating: ratingParam
      }
  }


// Mover a otro lado ya que es generico?

router.get('/:userId', async (req, res) => {
    try {

        const user = await UserSchema.findOne({_id: req.params.userId});

        const professionalRating = await ProfessionalRatingSchema.find({user: req.params.userId});

        const userServices = await UserServiceSchema.find({user: req.params.userId}).populate(  {
            path: 'service',
            model: 'Service',
            populate: {
                path: 'category',
                model: 'Category',
                select: 'name'
            }
          }
        );
    
        const userDto = await buildUserDto(user, professionalRating, userServices);
        
        res.send(userDto);
    } catch (err) {
        console.log("fail getting user data");
        res.status(400).send(err);
    }
});

async function buildUserDto(user, professionalRating, userServices) {
    return {
        user: user,
        rating: professionalRating,
        services: userServices
    }
}

module.exports = router;
