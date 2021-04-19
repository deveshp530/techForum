const { check } = require('express-validator');

exports.userValidator = [
  check('name').not().isEmpty().withMessage('name is required'),
  check('email').isEmail().withMessage('email must be valid'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('password must be 6 characters long'),
];

exports.userLoginValidator = [
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
