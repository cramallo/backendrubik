const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    client: { type: String, ref: 'User', required: true },
    professional: { type: String, ref: 'User', required: true },
    service: { type: Number, ref: 'Service', required: true },
    startDate: { type: Date, required: true },
    finishDate: { type: Date, required: true },

    // medios de pago en otro doc. (payments)

    // Finished, CancelledByClient, CancelledByProfessional
    status: { type: String, required: true }
});

bookingSchema.index({ professional: 1, startedDate: 1});

module.exports = mongoose.model('Booking', bookingSchema);