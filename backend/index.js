const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const patientRoutes = require('./routes/patient');
const medicalRecordRoutes = require('./routes/record');
const followupRecordRoutes = require('./routes/followuprecord');
const appointmentRoutes = require('./routes/appointments');
const MedicalDocumentRoutes = require('./routes/medicaldocument');
const practitionerRoutes = require('./routes/practitioners');
const patientRegisterRoutes = require('./routes/patientregister');
const practitionerRegisterRoutes = require('./routes/practitionerregister');
const loginRoutes = require('./routes/login');

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
app.use('/api/patient', patientRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/followuprecord', followupRecordRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medicaldocuments', MedicalDocumentRoutes);
app.use('/api/practitioners', practitionerRoutes);
app.use('/api/patient/register', patientRegisterRoutes);
app.use('/api/practitioner/register', practitionerRegisterRoutes);
app.use('/api/login', loginRoutes);


// ------------------ SERVER --------------------------
app.listen(3000, () => console.log('API running on http://localhost:3000'));
