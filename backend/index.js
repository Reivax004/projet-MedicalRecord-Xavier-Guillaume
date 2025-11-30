const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const patientRoutes = require('./routes/patient');
const medicalRecordRoutes = require('./routes/record');
const followupRecordRoutes = require('./routes/followuprecord');
const patientRegisterRoutes = require('./routes/patientregister');
const appointmentRoutes = require('./routes/appointments');
const MedicalDocumentRoutes = require('./routes/medicaldocument');

const app = express();

// ---------------- CONNECTION MONGO ------------------
mongoose.connect('mongodb://localhost:27017/MedicalRecord')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// ----------------- MIDDLEWARES ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type, X-Requested-With',
    credentials: true
}));

// ------------------ ROUTES --------------------------
app.use('/api/patients', patientRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/followuprecord', followupRecordRoutes);
app.use('/api/patientRegister', patientRegisterRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medicaldocuments', MedicalDocumentRoutes);


// ------------------ SERVER --------------------------
app.listen(3000, () => console.log('API running on http://localhost:3000'));
