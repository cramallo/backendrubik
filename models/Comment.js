const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: { type: Number, rrequired: true, ref:'User' },
    description: { type: String, required: true },
    professional: { type: Number, required: true, ref:'User' },
    eventId: { type: String, required: true},
    rating: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema)