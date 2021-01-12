const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 12,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      default: 'subscriber',
      type: String,
    },

    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  { timestamps: true }
);

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;

    this.salt = this.makeSalt();

    this._hashed_password = this.encrpytPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encrpytPassword(plainText) === this.hashed_password;
  },
  encrpytPassword: function (password) {
    if (!password) return '';

    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      console.error(err);
      return '';
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random() + '');
  },
};

module.exports = mongoose.model('User', UserSchema);
