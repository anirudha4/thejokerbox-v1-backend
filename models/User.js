const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})

const User = model('user', UserSchema);

module.exports = User;