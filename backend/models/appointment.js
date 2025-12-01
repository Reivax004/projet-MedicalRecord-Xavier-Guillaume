const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const AppointmentSchema = new Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
        index: true
    },

    /*practitionerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practitioner',
        required: true
    },*/

    name: {
        type: String,
        required: true },

    date: {
        type: Date,
        required: true,
        default: null,
        },

    type: {
        type: String,
        require: true },

    description: {
        type: String,
        required: false }

});

AppointmentSchema.index({ patientId: 1});

module.exports = mongoose.model('appointments', AppointmentSchema);