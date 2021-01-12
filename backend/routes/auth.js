const express = require('express')
const router = new express.Router()

const { userValidator } = require('../validators/auth')
const { runValidation } =  require('../validators')

const {register} = require('../controller/auth')

router.post('/register',userValidator,runValidation, register)

module.exports = router