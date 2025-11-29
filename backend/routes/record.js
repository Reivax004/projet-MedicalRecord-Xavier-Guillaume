const express = require('express');
const router = express.Router();

const MedicalRecord = require('../models/record');

// -----------------------------------------------------
// CREATE - POST /api/medical-records
// -----------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const record = new MedicalRecord(req.body);
        const saved = await record.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// READ ALL - GET /api/medical-records
// -----------------------------------------------------
router.get('/', async (req, res) => {
    try {
        const records = await MedicalRecord.find()
            //.populate('general_practitioner')
            .populate('vaccine');


        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// READ ONE - GET /api/medical-records/:id
// -----------------------------------------------------
router.get('/:id', async (req, res) => {
    try {
        const record = await MedicalRecord.findById(req.params.id)
            .populate('vaccine');
            //.populate('general_practitioner')


        if (!record) {
            return res.status(404).json({ error: 'Medical record not found' });
        }

        res.json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// UPDATE - PUT /api/medical-records/:id
// -----------------------------------------------------
router.put('/:id', async (req, res) => {
    try {
        const updated = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Medical record not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// DELETE - DELETE /api/medical-records/:id
// -----------------------------------------------------
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await MedicalRecord.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Medical record not found' });
        }

        res.json({ message: 'Medical record deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
