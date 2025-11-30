const express = require('express');
const router = express.Router();

const FollowupRecord = require('../models/followuprecord');

router.get('/:id', async (req, res) => {
    try {
        const record = await FollowupRecord.findById(Number(req.params.id));
        if (!record) {
            return res.status(404).json({ error: 'Follow-up record not found' });
        }

        res.json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Route : GET /api/followuprecord/patient/:patientId
router.get('/patient/:patientId', async (req, res) => {
    console.log('📥 Requête reçue pour patientId:',req.params.patientId );

    const records = await FollowupRecord.find({ patientId: Number(req.params.patientId)})
    .select("_id patientId pathology start_date end_date status prescriptions medical_document").lean();
    res.json(records);
});
// -----------------------------------------------------
// CREATE - POST /api/followup-records
// -----------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const record = new FollowupRecord(req.body);
        const saved = await record.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// READ ALL - GET /api/followup-records
// -----------------------------------------------------
router.get('/', async (req, res) => {
    try {
        const records = await FollowupRecord.find();
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// READ ONE - GET /api/followup-records/:id
// -----------------------------------------------------




// -----------------------------------------------------
// UPDATE - PUT /api/followup-records/:id
// -----------------------------------------------------
router.put('/:id', async (req, res) => {
    try {
        const updated = await FollowupRecord.findByIdAndUpdate(
            Number(req.params.id),
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Follow-up record not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// DELETE - DELETE /api/followup-records/:id
// -----------------------------------------------------
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await FollowupRecord.findByIdAndDelete(Number(req.params.id));

        if (!deleted) {
            return res.status(404).json({ error: 'Follow-up record not found' });
        }

        res.json({ message: 'Follow-up record deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
