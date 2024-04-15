const mongoose = require('mongoose')

// Define a schema for the "Patients" collection
const PatientSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    frequency: {
        type: Number,
        required: true,
    },
    originalFrequency: {
        type: Number,
    },
    currentWeek: {
        type: String,
    },
    patientReminderWeek: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
})

// Export the model based on the defined schema
module.exports = mongoose.model('patients', PatientSchema)