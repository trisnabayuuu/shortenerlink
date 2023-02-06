const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name: { type: String},
    username: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    });

module.exports = mongoose.model('auth', authSchema)