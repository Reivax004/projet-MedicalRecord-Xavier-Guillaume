const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const FollowupRecord = require('../models/followuprecord');

/*router.get('/:id', async (req, res) => {
    try {
        const record = await FollowupRecord.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ error: 'Follow-up record not found' });
        }

        res.json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});*/
// Route : GET /api/followuprecord/patient/:patientId
router.get('/:patientId', async (req, res) => {
    console.log('📥 Requête reçue pour patientId:',req.params.patientId );
    
    const patientId = new mongoose.Types.ObjectId(req.params.patientId);

    const results = await FollowupRecord.aggregate([
        {
          $match: { patientId: patientId }
        },
        {
          $group: {
            _id: "$status",
            dossiers: { $push: "$$ROOT" }
          }
        }
      ]);
      console.log(results);

      const response = {
        inProgress: [],
        others: []
      };
    
      for (const group of results) {
        if (group._id === "En cours" || group._id === "en cours") {
          response.inProgress = group.dossiers;
        } else {
          response.others = group.dossiers;
        }
      }

      
    console.log('📤 Envoi des follow-up records:', results );
    res.json(response);
});

router.get('/form/:patientId', async (req, res) => {
    console.log('📥 Requête reçue pour patientId:',req.params.patientId );
    
    const records = await FollowupRecord.findById(req.params.patientId)
    .select("_id patientId pathology start_date end_date status prescriptions medical_document").lean();
    console.log('📤 Envoi des follow-up records:', records );
    res.json(records);
});

// -----------------------------------------------------
// CREATE - POST /api/followup-records
// -----------------------------------------------------
router.post('/', async (req, res) => {
    try {
        console.log('📥 Requête de création de follow-up record:', req.body);
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
