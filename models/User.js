
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const roles = ['BASIC', 'PROFESSIONAL', 'ADMIN'];

const userSchema = new Schema({
    _id: { type: Number, index: true, unique: true },
    email: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    cuit: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    //rating: { type: Number, required: true, default: 0 },
    //points: { type: Number, required: true, default: 0 },
    billVoucher: { type: String, required: true },
    role: { type: String, enum: roles, required: true, default: 'BASIC' }
}, { _id: false });

userSchema.plugin(AutoIncrement);

module.exports = mongoose.model('User', userSchema);