const Booking = require('../models/booking');
const UserService = require('../models/userService');
const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');


router.post('/:serviceId', [verifyToken], async (req, res) => {

    const userService = UserService.findBy({ email: req.body.email, service: req.params.serviceId });

    const booking = new Booking({
        _id: req.body.id,
        professional: req.body.email,
        service: req.params.serviceId,
        startedDate: req.body.startDate,
        finishDate: calculateFinishDate(userService.minutesBetweenService, req.body.startedDate)
    });
    
    try {
        const savedBooking = await booking.save();
        res.send(savedBooking);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

router.get('/professional/:professionalId/service/:serviceId?date', async (req, res) => {
    try {
        const foundBooking = await Booking.findBy({ professional: req.params.professional, service: req.params.serviceId });
        res.send(foundBooking);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

function calculateFinishDate(addMinutes, startedDate) {
    return moment(startedDate).add(addMinutes, 'm').toDate();
}

module.exports = router;
