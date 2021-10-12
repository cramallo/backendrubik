const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payment = new Schema({
    user: { type: Number, required: true, ref: 'User' },
    name: { type: String },
    cvv: { type: Number, required: true },
    number: { type: String, required: true },
    expirationDate: { type: String, required: true },
    bank: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', payment);