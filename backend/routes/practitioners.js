const express = require('express');
const router = express.Router();

const Practitioner = require('../models/practitioners');

// -----------------------------------------------------
// CREATE - POST /api/practitioners
// -----------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const practitioner = new Practitioner(req.body);
        const saved = await practitioner.save();
        saved.password = undefined; // remove password from response

        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// READ ONE - GET /api/practitioners/:id
// -----------------------------------------------------
router.get('/:id', async (req, res) => {
    try {
        const practitioner = await Practitioner.findById(req.params.id);

        if (!practitioner) {
            return res.status(404).json({ error: 'Practitioner not found' });
        }
        practitioner.password = undefined;

        res.json(practitioner);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// UPDATE - PUT /api/practitioners/:id
// -----------------------------------------------------
router.put('/:id', async (req, res) => {
    try {
        const updated = await Practitioner.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Practitioner not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// DELETE - DELETE /api/practitioners/:id
// -----------------------------------------------------
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Practitioner.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Practitioner not found' });
        }

        res.json({ message: 'Practitioner deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
