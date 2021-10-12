const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    _id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description:  { type: String, required: true },
    category: { type: Number, ref: 'Category', required: true },
    imgs: [ { type: String } ]
});

module.exports = mongoose.model('Service', serviceSchema);