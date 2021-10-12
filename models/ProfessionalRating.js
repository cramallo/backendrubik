const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalRating = new Schema({
    user: { type: Number, required: true, ref: 'User' },
    fiveStarsCount: { type: Number, default: 0 },
    fourStarsCount: { type: Number, default: 0 },
    threeStarsCount: { type: Number, default: 0 },
    twoStarsCount: { type: Number, default: 0 },
    oneStarCount: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    weigthAverageRating: { type: Number, default: 0 },
});

module.exports = mongoose.model('ProfessionalRating', professionalRating);