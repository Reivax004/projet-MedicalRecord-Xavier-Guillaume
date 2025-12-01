const mongoose = require('mongoose');

// Sous-schéma adresse
const addressSchema = new mongoose.Schema({
    number: { type: Number, required: false },
    street: { type: String, required: false },
    postal_code: { type: Number, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false }
}, { _id: false });

// Sous-schéma établissement
const establishmentSchema = new mongoose.Schema({
    name: { type: String, required: false },
    address: { type: addressSchema, required: false },
    type: { type: String, required: false },
    description: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    creation_date: { type: Date, required: false },
    number_employees: { type: Number, required: false }
}, { _id: false });

// Schéma praticien
const practitionerSchema = new mongoose.Schema({
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    specialization: { type: String, required: true },
    phone: { type: String, required: true },
    establishment: { type: establishmentSchema, required: false }  // rendu optionnel
});

module.exports = mongoose.model('Practitioner', practitionerSchema);
