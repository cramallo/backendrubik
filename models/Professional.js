const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalSchema = new Schema({
    _id: { type: Number, required: true, index: true, unique: true },
    user: { type: Number, required: true, ref: 'User' },
    monotax: { type: String, requried: true }
});

module.exports = mongoose.model('Professional', professionalSchema);