const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');

// CREATE - POST /api/patients
router.post('/', async (req, res) => {
    try {
        const patient = new Patient(req.body);
        const saved = await patient.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ALL - GET /api/patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ONE - GET /api/patients/:id
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// READ ALL PATIENTS OF A PRACTITIONER - GET /api/practitioners/:id
router.get('/practitioners/:id', async (req, res) => {
    try {
        const practitionerId = new mongoose.Types.ObjectId(req.params.id);
        const patients = await Patient.find({
            "general_file.general_practitioner.practitionerId": practitionerId
        });
        if (!patients || patients.length === 0) {
            return res.status(404).json({ error: "Aucun patient trouvé pour ce praticien." });
        }
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// UPDATE - PUT /api/patients/:id
router.put('/:id', async (req, res) => {
    try {
        const updated = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - DELETE /api/patients/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Patient.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

