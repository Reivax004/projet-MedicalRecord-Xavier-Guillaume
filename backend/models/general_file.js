// backend/models/record.js
const { Schema } = require('mongoose');
const { VaccineSchema } = require('./vaccine');

const MedicalRecordSchema = new Schema({
    weight: {
        type: Number,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    blood_group: {
        type: String,
        required: false
    },
    blood_pressure: {
        type: String,
        required: false
    },
    // si tu veux remettre plus tard un snapshot du médecin traitant :
    // general_practitioner: [{
    //   practitionerId: Number,
    //   lastname: String,
    //   firstname: String
    // }],
    vaccines: {
        type: [VaccineSchema],
        default: []
    },
    allergies: {
        type: [String],
        default: []
    }
}, { _id: false }); // embedded, pas de _id

module.exports = { MedicalRecordSchema };
