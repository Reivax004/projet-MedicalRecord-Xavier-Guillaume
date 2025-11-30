const mongoose = require('mongoose');
const { Schema } = mongoose;


const PrescriptionSchema = new Schema({
    drug_name: { type: String, required: true },
    shape: { type: String, required: true },
    quantity: { type: Number, required: true },
    frequency: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: { type: String, required: true },
});

module.exports = { PrescriptionSchema };
