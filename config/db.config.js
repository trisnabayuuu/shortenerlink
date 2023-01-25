// import mongoose packageiiiiii
const mongoose = require('mongoose')
const DB_URI = 'mongodb://127.0.0.1:27017'

mongoose.set('strictQuery', false);

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
module.exports = connection