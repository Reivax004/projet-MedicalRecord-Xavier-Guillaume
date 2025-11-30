const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const MedicalDocumentSchema = new mongoose.Schema({
    follow_up_file_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'FollowupRecord',
        required: true
    },
    /*practitioner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Practitioner",
        required: true
    },*/
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('MedicalDocument', MedicalDocumentSchema);
