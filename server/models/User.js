const mongoose = require("mongoose");

const bcrypt = require('bcrypt');


// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: 'Account already exists.',
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// Model
const User = mongoose.model('user', UserSchema);

module.exports = User;
