const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    priority: { type: Number, required: true, unique: true },
    points: { type: Number, required: true },
    price: { type: Number, required: true },
    days: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema)