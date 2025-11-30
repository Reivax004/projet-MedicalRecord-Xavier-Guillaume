const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const {PrescriptionSchema} = require("./prescriptions");

const FollowupRecordSchema = new Schema({
    patientId: { type: String, required: false },
    pathology: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, default: null },
    prescriptions: [PrescriptionSchema],
    status: { type: String}
});
module.exports = mongoose.model('FollowupRecord', FollowupRecordSchema);
