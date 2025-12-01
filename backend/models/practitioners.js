// backend/models/patient.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const practitionerSchema = new Schema(
    {
        lastname:  { type: String, required: true },
        firstname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        specialization: {type: String, required: true },
        phone: { type: String, required: true },
        establishments: {
            establishmentId:{
                type: mongoose.Schema.Types.ObjectId,
                        ref : 'establishments',
                        required: true
                },
            name: {type: String, required: true}
        }
        
    },
    { versionKey: false }
);

module.exports = mongoose.model('practitioners', practitionerSchema);
