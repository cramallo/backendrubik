const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userService = new Schema({
    service: { type: Number, required: true, ref: 'Service' },
    user: { type: Number, required: true, ref: 'User' },
    description: { type: String },
    price: { type: Number, required: true },
    discount: {
        percentage: { type: Number, required: true }
    },
    minutesBetweenService: { type: Number, default: 30 }
}, { timestamps: true });

module.exports = mongoose.model('UserService', userService);