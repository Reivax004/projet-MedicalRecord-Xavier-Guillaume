const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const AppointmentSchema = new Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true 
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
        default: null },

    type: { 
        type: String, 
        require: true },

    description: { 
        type: String, 
        required: false }

});

module.exports = mongoose.model('Appointment', AppointmentSchema);