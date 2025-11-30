const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const {PrescriptionSchema} = require("./prescriptions");

const FollowupRecordSchema = new Schema({
    _id: { type: Number },
    patientId: { type: Number, required: false },
    pathology: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, default: null },
    prescriptions: [PrescriptionSchema],
    status: { type: String}
});
module.exports = mongoose.model('FollowupRecord', FollowupRecordSchema);
