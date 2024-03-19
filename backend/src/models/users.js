const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Users = new mongoose.model('User', userSchema);

module.exports = Users;