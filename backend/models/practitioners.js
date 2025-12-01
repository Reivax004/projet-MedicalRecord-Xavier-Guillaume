// backend/models/patient.js
const mongoose = require('mongoose');
const {VaccineSchema} = require("./vaccine");
const { Schema } = mongoose;

// sous-schéma d'adresse (embedded)
const AddressSchema = new Schema({
    number: Number,
    street: String,
    postal_code: Number,
    city: String,
    country: String
}, { _id: false });


// Sous-schéma établissement
const establishments = new Schema({
    name: { type: String, required: false },
    address: AddressSchema,
    type: { type: String, required: false },
    description: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    creation_date: { type: Date, required: false },
    number_employees: { type: Number, required: false }
}, { _id: false });

const practitionerSchema = new Schema(
    {
        lastname:  { type: String, required: true },
        firstname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        specialization: {type: String, required: true },
        phone: { type: String, required: true },
        establishments: { type: establishments, required: false },
        
    },
    { versionKey: false }
);

module.exports = mongoose.model('practitioners', practitionerSchema);
