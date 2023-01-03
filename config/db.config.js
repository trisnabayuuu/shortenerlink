// import mongoose package
const mongoose = require('mongoose')

// declare a Database string URI
const DB_URI = 'mongodb://localhost:27017'

mongoose.set('strictQuery', false);
// establishing a database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
module.exports = connection