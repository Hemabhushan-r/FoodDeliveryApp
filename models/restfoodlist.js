const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create schema 
const RestFoodlist = new Schema({
    index: {
        type: Number,
        required: [true, 'The index field is required'],
      },
  Offer: {
    type: String,
    required: [true, 'The offer field is required'],
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
  Food_Name: {
    type: String,
    required: [true, 'The Price_B text field is required'],
  }
  ,
  Food_Price: {
    type: String,
    required: [true, 'The Price_B text field is required'],
  }
  ,
  Food_Cat: {
    type: String,
    required: [true, 'The Price_B text field is required'],
  }
  ,
  Food_Cat_Count: {
    type: String,
    required: [true, 'The Price_B text field is required'],
  }
  ,
  Food_Subcat: {
    type: String,
    required: [true, 'The Price_B text field is required'],
  }
  ,
  Food_Subcat_Count: {
    type: String,
    required: [true, 'The Price_B text field is required'],
  }
  ,
  Food_Description: {
    type: String,
    required: [true, 'The Price_B text field is required'],
  }
  ,
  Food_Veg_Nveg: {
    type: String,
    required: [true, 'The Price_B text field is required'],
  }
  ,
  
});
// Create model

const RestaurantFoodlist = mongoose.model('bangalore_res_foodlist', RestFoodlist);
module.exports = RestaurantFoodlist;