const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Appointment = require('../models/appointment');

// -----------------------------------------------------
// READ ONE - GET /api/appointments/:id
// -----------------------------------------------------
router.get('/:id/:type', async (req, res) => {
    try {
        var appointments = undefined;
        if(req.params.type === 'practitioner'){
            appointments = await Appointment.find({ practitionerId: req.params.id }).limit(10).sort({ date: -1 }).populate('practitionerId', 'firstname lastname').populate('patientId','firstname lastname').exec();;
        }
        else{
            appointments = await Appointment.find({ patientId: req.params.id }).limit(10).sort({ date: -1 }).populate('practitionerId', 'firstname lastname').populate('patientId','firstname lastname').exec();;
        }

        console.log("Fetched appointments:", appointments);
        return res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// READ ALL PATIENTS OF A PRACTITIONER - GET /api/practitioners/numbers/:id
router.get('/practitioners/numbers/:practitionerId', async (req, res) => {
    try {
        console.log("Fetching patients for practitioner ID:", req.params.practitionerId);
        const practitionerId = new mongoose.Types.ObjectId(req.params.practitionerId);
        const result = await Appointment.aggregate([
            {
              $match: {
                practitionerId: practitionerId
              }
            },
            {
                $group: {
                    _id: '$patientId',
                    totalMeetings: { $sum: 1 }
                }
            },
          ]);
        console.log("Fetched patients:", result);

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Aucun patient trouvé pour ce praticien." });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });   
    }
});


module.exports = router;
