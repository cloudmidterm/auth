const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema(
    {
        userid: { type: Number, unique: true }, // Auto-incremented ID
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, // Renamed 'pass' to 'password'
        role: { type: String, enum: ['user', 'restaurant'], required: true } // 'A' for admin, 'C' for customer
    }, 
    { timestamps: true }
);

// Auto-incrementing the `userid` field
UserSchema.plugin(AutoIncrement, { inc_field: 'userid' });

module.exports = mongoose.model('User', UserSchema);
