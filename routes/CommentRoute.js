const Comment = require('../models/comment');
const ProfessionalRating = require('../models/professionalRating');
const router = require('express').Router();

router.post('/:professional/service/:eventId', async (req, res) => {

    const comment = new Comment({
        user: req.body.user,
        description: req.body.description,
        professional: req.params.professional,
        eventId: req.params.eventId,
        rating: req.body.rating
    });

    try {
        const savedComment = await comment.save();

        // Actualizo puntaje profesional
        var professionalRating = await ProfessionalRating.findOne({user: req.params.professional});

        if(!professionalRating) {
            console.log("no existe");
            professionalRating = new ProfessionalRating({
                user: req.params.professional
            });
        }

        if(req.body.rating == 5) {
            professionalRating.fiveStarsCount += 1;
        }

        if(req.body.rating == 4) {
            professionalRating.fourStarsCount += 1;
        }

        if(req.body.rating == 3) {
            professionalRating.threeStarsCount += 1;
        }

        if(req.body.rating == 2) {
            professionalRating.twoStarsCount += 1;
        }

        if(req.body.rating == 1) {
            professionalRating.oneStarCount += 1;
        }

        professionalRating.totalRatings += 1;
        professionalRating.weigthAverageRating = calculateNewWeightAverageRating(professionalRating);

        console.log(professionalRating.weigthAverageRating);

        await professionalRating.save();

        res.send(savedComment);
    } catch (err) {
        console.log("route error");
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/:user/:eventId', async (req, res) => {

    try {
        const comments = await Comment.find({professionalEmail: req.params.user, eventId: req.params.eventId});
        res.send(comments);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

router.get('/:userId', async (req, res) => {

    try {
        const comments = await Comment.find({professional: req.params.userId}).populate('user');
        res.send(comments);
    } catch (err) {
        console.log("route error");
        res.status(400).send(err);
    }
});

function calculateNewWeightAverageRating(professionaRating) {
    return Math.round(
        (
            (5 * professionaRating.fiveStarsCount + 4 * professionaRating.fourStarsCount
            + 3 * professionaRating.threeStarsCount + 2 * professionaRating.twoStarsCount
            + professionaRating.oneStarCount) 
            
            / 

            professionaRating.totalRatings
        )  *10
    ) / 10;
}

module.exports = router;
