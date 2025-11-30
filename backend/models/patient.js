// backend/models/patient.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MedicalRecordSchema } = require('./record');

// sous-schéma d'adresse (embedded)
const AddressSchema = new Schema({
    number: Number,
    street: String,
    postal_code: Number,
    city: String,
    country: String
}, { _id: false });

const patientSchema = new Schema(
    {
        SSN: { type: Number },                 // non required pour ne pas casser ton front
        lastname:  { type: String, required: true },
        firstname: { type: String, required: true },
        birthdate: { type: Date },
        address: AddressSchema,               // embedded
        sex: { type: String },
        phone: { type: Number },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        // dossier médical général embedded
        general_file: MedicalRecordSchema,

        isActive: { type: Boolean, default: true }
    },
    { versionKey: false }
);

module.exports = mongoose.model('Patient', patientSchema);
