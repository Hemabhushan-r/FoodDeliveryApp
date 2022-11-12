const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create schema 
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name text field is required'],
  },
  email: {
    type: String,
    required: [true, 'The email field is required'],
  },
  password: {
    type: String,
    required: [true, 'The password field is required'],
  },
  number: {
    type: Number,
    required: [true, 'The number field is required'],
  },
  id: {
    type: String
  },
  role:{
    type: String,
    required: [true, 'The role field is required'],
  }
});
// Create model
const Usermodel = mongoose.model('users', UserSchema);
module.exports = Usermodel;