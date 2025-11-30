// backend/models/record.js
const { Schema } = require('mongoose');
const { VaccineSchema } = require('./vaccine');

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
    // si tu veux remettre plus tard un snapshot du médecin traitant :
    // general_practitioner: [{
    //   practitionerId: Number,
    //   lastname: String,
    //   firstname: String
    // }],
    vaccines: [VaccineSchema],          // NOTE: je mets "vaccines" (pluriel)
    allergies: {
        type: [String],
        default: []
    }
}, { _id: false }); // embedded, pas de _id

module.exports = { MedicalRecordSchema };
