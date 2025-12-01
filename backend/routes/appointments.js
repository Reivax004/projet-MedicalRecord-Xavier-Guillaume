const express = require('express');
const router = express.Router();

const Appointment = require('../models/appointment');

// -----------------------------------------------------
// READ ONE - GET /api/appointments/:id
// -----------------------------------------------------
router.get('/:id', async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.params.id }).limit(10).sort({ date: -1 });

        console.log("Fetched appointments:", appointments);
        return res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
