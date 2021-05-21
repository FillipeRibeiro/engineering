require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Database Connected'))

app.use(express.json())

const subscribersRouters = require('./routes/subscribers')
app.use('/subscribers', subscribersRouters)

app.listen(3000, () => console.log('server started'))