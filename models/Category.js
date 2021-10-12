const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description:  { type: String, required: true },
    imgs: [ { type: String } ],
    mainImage: { type: String }
});

module.exports = mongoose.model('Category', categorySchema);