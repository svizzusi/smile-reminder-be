const userSchema = require('../models/UserSchema')
const bcrypt = require('bcrypt')

const handleErrorResponse = (res, error) => {
    console.error(error);
    return res.status(500).json({
        message: 'Internal Server Error',
        error,
        success: false,
    });
};

module.exports = {
    signup: async (req, res) => {
        console.log(req)
        console.log(req.body)
        try {
            const {name, email, password} = req.body
            const existingUser = await userSchema.findOne({email: email});
            if (existingUser) {
                return res.json({
                    message: "User already exists, login instead",
                    success: false,
                })
            }
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = await userSchema.create({ name, email, password: hashPassword })
            return res.json({
                message: 'Account created successfully',
                success: true,
                userName: newUser.name,
                id: newUser._id
            })
        } catch (err) {
            handleErrorResponse(res, err)
        }
    }

    
}