const express = require('express');
const router = express.Router();

const FollowupRecord = require('../models/followuprecord');
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
router.get('/:id', async (req, res) => {
    try {
        const record = await FollowupRecord.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ error: 'Follow-up record not found' });
        }

        res.json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// UPDATE - PUT /api/followup-records/:id
// -----------------------------------------------------
router.put('/:id', async (req, res) => {
    try {
        const updated = await FollowupRecord.findByIdAndUpdate(
            req.params.id,
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
        const deleted = await FollowupRecord.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Follow-up record not found' });
        }

        res.json({ message: 'Follow-up record deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
