const express = require('express');
const router = express.Router();
const MedicalDocument = require('../models/MedicalDocument');


// =========================
// 🔹 CREATE ONE DOCUMENT
// =========================
router.post('/create', async (req, res) => {
    try {
        const doc = new MedicalDocument(req.body);
        const saved = await doc.save();
        res.json(saved);
    } catch (err) {
        console.error("Erreur création document médical :", err);
        res.status(500).json({ message: err.message });
    }
});


// ==============================================
// 🔹 CREATE MULTIPLE (utilisé pendant le create followup)
// ==============================================
router.post('/create-multiple', async (req, res) => {
    try {
        const docs = await MedicalDocument.insertMany(req.body);
        res.json(docs);
    } catch (err) {
        console.error("Erreur création multiple :", err);
        res.status(500).json({ message: err.message });
    }
});


// =========================
// 🔹 GET ALL DOCUMENTS
// =========================
router.get('/', async (req, res) => {
    try {
        const docs = await MedicalDocument.find().populate('follow_up_file_Id');
        res.json(docs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// =========================
// 🔹 GET DOCUMENT BY ID
// =========================
router.get('/:id', async (req, res) => {
    try {
        const doc = await MedicalDocument.findById(req.params.id);

        if (!doc) {
            return res.status(404).json({ message: "Document introuvable" });
        }

        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// =========================
// 🔹 GET DOCUMENTS BY FOLLOWUP ID
// =========================
router.get('/followup/:followupId', async (req, res) => {
    try {
        const docs = await MedicalDocument.find({
            follow_up_file_Id: req.params.followupId
        });

        res.json(docs);
    } catch (err) {
        console.error("Erreur récupération par followup :", err);
        res.status(500).json({ message: err.message });
    }
});


// =========================
// 🔹 UPDATE DOCUMENT
// =========================
router.put('/:id', async (req, res) => {
    try {
        const updated = await MedicalDocument.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Document introuvable" });
        }

        res.json(updated);
    } catch (err) {
        console.error("Erreur update :", err);
        res.status(500).json({ message: err.message });
    }
});


// =========================
// 🔹 DELETE DOCUMENT
// =========================
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await MedicalDocument.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Document introuvable" });
        }

        res.json({ message: "Document supprimé" });
    } catch (err) {
        console.error("Erreur suppression :", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
