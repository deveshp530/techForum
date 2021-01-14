const AWS = require('aws-sdk');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      error: 'Email is takend',
    });
  } else {
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: '10m',
      }
    );
  }

  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<html>
                  <body>
                     <h1>Verify Email</h1>
                     <p>Use following link to complete registration</p>
                     <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                  </body>
               </html>`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Complete your registration',
      },
    },
  };

  const sendEmail = ses.sendEmail(params).promise();

  sendEmail
    .then((data) => {
      console.log('email submitted to ses', data);
      res.send('Email sent');
    })
    .catch((err) => {
      console.error('Ses email on register', err);
      res.send('email failed');
    });
};
