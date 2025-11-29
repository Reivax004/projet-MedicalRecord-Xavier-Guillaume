const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const {VaccineSchema} = require("./vaccine");

const MedicalRecordSchema = new Schema({
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    blood_group: {
        type: String,
        required: true
    },
    blood_pressure: {
        type: String,
        required: true
    },
    /*general_practitioner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practitioner',
        required: true
    },*/
    vaccine: [VaccineSchema],
    allergies: {
        type: [String],   // tableau de strings
        default: []
    }
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
