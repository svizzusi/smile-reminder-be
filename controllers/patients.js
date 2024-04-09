const patientSchema = require('../models/Patient')

const handleErrorResponse = (res, err) => {
    res.status(500).json(err) //send error response as json
            console.error(err) //log the error
};

module.exports = {
    createPatient: async (req, res) => {
        try {
            const Patient = await patientSchema.create(req.body)
            res.status(200).json(Patient)
        } catch (error) {
            handleErrorResponse(res, err)
        }
    }
}