const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({origin: process.env.CLIENT_URL}))

const authRoute = require('./routes/auth')

const port = process.env.PORT || 8000

app.use('/api', authRoute)

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})