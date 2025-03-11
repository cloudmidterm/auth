require('dotenv').config();
const express = require('express');
const app = express();
const port = 5002;
const jwt = require('jsonwebtoken');
const dbconnect = require('./dbconnect.js');  // Assuming you have a DB connection setup
const UserSchema = require('./userModel.js'); // Assuming the user model is in 'userModel.js'

app.use(express.json()); // Middleware to parse JSON requests

const JWT_SECRETE = process.env.JWT_SECRETE;

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Looking for user with email:", email);
        const user = await UserSchema.findOne({ email: email });
        
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }

        // Compare the provided password with the stored plain-text password
        console.log("Stored password (plain-text):", user.password);
        console.log("Provided password:", password);

        // Direct comparison of plain-text passwords
        if (password === user.password) {
            const token = jwt.sign(
                { email: user.email, role: user.role },
                JWT_SECRETE,
                { expiresIn: '24h' }  // Token expiration time
            );
            return res.json({ token, role: user.role });
        } else {
            return res.status(400).send("Invalid email or password");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});

app.listen(port, () => {
    console.log('LOGIN Service Server is running on PORT NO:', port);
});
