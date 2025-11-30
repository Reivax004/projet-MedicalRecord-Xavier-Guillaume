const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Patient = require('../models/patient');

// REGISTER PATIENT
router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: 'Champs manquants' });
        }

        const existing = await Patient.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'Email déjà utilisé' });
        }

        const hash = await bcrypt.hash(password, 10);

        const patient = new Patient({
            firstname,
            lastname,
            email,
            password: hash,
        });

        const saved = await patient.save();

        const { password: _, ...safe } = saved.toObject();

        res.status(201).json(safe);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
