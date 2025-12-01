const express = require('express');
const Patient = require('../models/patient');
const Practitioner = require('../models/practitioner');

const router = express.Router();

// POST /api/login
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        // On cherche d'abord un patient
        let user = await Patient.findOne({ email, password });

        let userType = 'patient';

        // Si pas trouvé, on cherche un praticien
        if (!user) {
            user = await Practitioner.findOne({ email, password });
            userType = 'practitioner';
        }

        if (!user) {
            return res.status(400).json({ message: 'Identifiants invalides' });
        }

        return res.json({
            message: 'Connexion réussie',
            id: user._id,
            type: userType,           // 'patient' ou 'practitioner'
            firstname: user.firstname,
            lastname: user.lastname
        });
    } catch (err) {
        console.error('Erreur login:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;