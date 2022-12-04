const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create schema 
const ActiveOrdersSchema = new Schema({
  cust_name: {
    type: String,
    required: [true, 'The cust_name text field is required'],
  },
  cust_email: {
    type: String,
    required: [true, 'The cust_email field is required'],
  },
  cust_num: {
    type: String,
    required: [true, 'The cust_num field is required'],
  },
  deliveryperson_name: {
    type: String,
    required: [true, 'The deliveryperson_name text field is required'],
  },
  deliveryperson_email: {
    type: String,
    required: [true, 'The deliveryperson_email field is required'],
  },
  deliveryperson_num: {
    type: String,
    required: [true, 'The deliveryperson_num field is required'],
  },
  cartDetails:{
    type: Object,
    required: [true, 'The cartDetails field is required'],
  }
});
// Create model
const ActiveOrdersmodel = mongoose.model('activeorders', ActiveOrdersSchema);
module.exports = ActiveOrdersmodel;