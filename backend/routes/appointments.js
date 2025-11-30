const express = require('express');
const router = express.Router();

const Appointment = require('../models/appointment');

// -----------------------------------------------------
// READ ONE - GET /api/appointments/:id
// -----------------------------------------------------
router.get('/:id', async (req, res) => {
    try {
        const record = await Appointment.find(({ patientId: req.params.id }));

        if (!record) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
