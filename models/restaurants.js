const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create schema 
const Restaurant = new Schema({
  price: {
    type: Number,
    required: [true, 'The price field is required'],
  },
  Restaurant_Name: {
    type: String,
    required: [true, 'The Restaurant_Name text field is required'],
  },
  Restaurant_URL: {
    type: String,
    required: [true, 'The Restaurant_URL text field is required'],
  },
  Restaurant_Description: {
    type: String,
    required: [true, 'The Restaurant_Description text field is required'],
  },
  Restaurant_Rating: {
    type: String,
    required: [true, 'The Restaurant_Rating text field is required'],
  },
  Price_B: {
    type: String,
    required: [true, 'The Price_B text field is required'],
  }
  ,
});
// Create model
const Restaurants = mongoose.model('bangalore_res', Restaurant);
module.exports = Restaurants;