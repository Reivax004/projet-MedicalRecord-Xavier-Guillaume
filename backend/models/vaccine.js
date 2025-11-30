const { Schema } = require('mongoose');

const VaccineSchema= new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    injection_date: {
        type: Date,
        required: true
    },
    vaccination_type: {
        type: String,
        required: true,
        trim: true
    },
    vaccinator_name: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false });

module.exports = { VaccineSchema };