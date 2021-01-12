const {check} = require('express-validator')

exports.userValidator = [
    check('name').not().isEmpty().withMessage('name is required'),
    check('email').isEmail().withMessage('email must be valid'),
    check('password').isLength({min: 6}).withMessage('password must be 6 characters long')

]