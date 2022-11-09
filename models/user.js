const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create schema 
const UserSchema = new Schema({
  food: {
    type: String,
    required: [true, 'The food text field is required'],
  },
  price: {
    type: Number,
    required: [true, 'The price field is required'],
  },
});
// Create model
const FoodPrices = mongoose.model('users', UserSchema);
module.exports = FoodPrices;