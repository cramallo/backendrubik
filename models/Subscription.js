const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    _id: { type: Number, required: true, unique: true },
    user: { type: Number, required: true },
    service: { type: Number, required: true },
    plan: { type: Number, required: true, ref: 'Plan' },
    // AVAILABLE, CANCELLED, PAID
    status: { type: String, required: true, default: "CANCELLED" },
    // Para saber si cancelo a mitad de mes, cuando termino la fecha de expiracion se mueve el status a cancelled
    next_period_available: { type: Boolean, default: true },
    //Se renueva por cada request de suscripcion o job que se corre todos los dias
    startedPeriodDate: { type: Date, required: true,  default: Date.now() },
    expirationDate: { type: Date, required: true }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);