const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create schema 
const UserCartItemsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name text field is required'],
  },
  email: {
    type: String,
    required: [true, 'The email field is required'],
  },
  id: {
    type: String
  },
  cartItems:{
    type: Array,
    required: [true, 'The cartItems field is required'],
    default:[],
  }
});
// Create model
const UserCartItemsmodel = mongoose.model('usersCartItems', UserCartItemsSchema);
module.exports = UserCartItemsmodel;