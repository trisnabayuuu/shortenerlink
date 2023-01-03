// const express = require('express')
// const app = express()
// const port = 3000
// const shortId = require('shortid')
// const createHttpError = require('http-errors')
// const mongoose = require('mongoose')
// const path = require('path')
// const { dirname } = require('path')

// app.use(express.static(path.join(--dirname, 'public')))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.set('view engine', 'ejs')
// app.get('/', async(req, res, next) => {
//     res.render('index')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

const express = require("express")
const app = express()

// Database config
const connection = require('./config/db.config')
connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

// Routes Config
app.use(express.json({
    extended: false
})) //parse incoming request body in JSON format.
app.use('/', require('./routes/redirect'))
app.use('/api/url', require('./routes/url'))

//Listen for incoming requests
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`))