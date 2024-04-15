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
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body; // Destructure user data from the request body
            const user = await userSchema.findOne({ email: email }); // Find a user with the given email
            if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
                if (isPasswordValid) {
                    res.json({
                        success: true,
                        message: 'Login successful',
                        userName: user.name,
                        id: user._id
                    }); // Send a success response if login is successful
                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect username or password'
                    }); // Send a response indicating incorrect username or password
                }
            } else {
                res.json({
                    success: false,
                    message: 'User does not exist'
                }); // Send a response indicating that the user does not exist
            }
        } catch (err) {
            return handleErrorResponse(res, err);
        }
    }
}