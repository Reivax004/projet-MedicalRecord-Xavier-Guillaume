const mongoose = require('mongoose');
const { Schema } = mongoose;


const PrescriptionSchema = new Schema({
    medication: { type: String, required: true },
    posology: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date }
});

module.exports = { PrescriptionSchema };
