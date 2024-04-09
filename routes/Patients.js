const express = require('express')
const router = express.Router()
const patientsController = require('../controllers/patients')

router.post('/createPatient', patientsController.createPatient)

const patientRouter = router
module.exports = patientRouter