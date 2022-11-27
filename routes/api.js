const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const instance = new Razorpay({
    key_id: 'rzp_live_1MykQeYgLLtfoG',
    key_secret: 'cLQEAqtYsO8b6vTEX7ubqwbd',
});
const FoodPrices=require('../models/foodlist');
const Restaurants=require('../models/restaurants');
const UserCart=require('../models/userCartItems');
const RestaurantFoodlist=require('../models/restfoodlist');


router.get("/order", (req, res) => {
  try {
    const options = {
      amount: 20 * 100, // amount == Rs 10
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0,
 // 1 for automatic capture // 0 for manual capture
    };
  instance.orders.create(options, async function (err, order) {
    if (err) {
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  return res.status(200).json(order);
 });
} catch (err) {
  return res.status(500).json({
    message: "Something Went Wrong",
  });
 }
});


router.post("/capture/:paymentId", (req, res) => {
  try {
    return request(
     {
     method: "POST",
     url: `https://${config.RAZOR_PAY_KEY_ID}:${config.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
     form: {
        amount: 10 * 100, // amount == Rs 10 // Same As Order amount
        currency: "INR",
      },
    },
   async function (err, response, body) {
     if (err) {
      return res.status(500).json({
         message: "Something Went Wrong",
       }); 
     }
      console.log("Status:", response.statusCode);
      console.log("Headers:", JSON.stringify(response.headers));
      console.log("Response:", body);
      return res.status(200).json(body);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
   });
  }
});


router.get('/restaurant_list',(req,res,next)=>{
  Restaurants.find({})
    .then(data=>{
      res.send(data)
    })
    .catch(err=>{
      console.log(err)
    })
})
router.post('/rest_foodlist',async (req,res,next)=>{
  const {Restaurant_URL}=req.body
  //console.log(Restaurant_URL)
  try{
    const rest_foodlist=await RestaurantFoodlist.findOne({Restaurant_URL:Restaurant_URL});
    if(!rest_foodlist){
      return res.status(404).json({message:'Restaurant Foodlist Not Found'});
    }
    res.status(200).json({rest_foodlist:rest_foodlist})
  }
  catch(error){
    res.status(500).json({message:'Something went wrong'})
  }
})
router.get('/getusercartItems',async (req,res,next)=>{
  const {name,email}=req.body;
  try{
    const usercartItems=await UserCart.findOne({name:name,email:email});
    if(!usercartItems){
      return res.status(404).json({message:'User Cart Not Found'});
    }
    res.status(200).json({cartItems:usercartItems.cartItems})
  }catch(error){
    res.status(500).json({message:'Something went wrong'})
  }
})
router.patch('/updatecartItems',(req,res,next)=>{
  const {name,email,cartItems}=req.body;
  try{
    UserCart.updateOne({name:name,email:email},{$push:{cartItems:{$each:cartItems}}})
  }
  catch(error){
    res.status(500).json({message:'Soemthing went wrong'})
  }
})
router.get('/foodlist', (req, res, next) => {
  // get placeholder
  FoodPrices.find({})
});
router.post('/foodlist', (req, res, next) => {
  // post placeholder
  if(req.body.action){
    FoodPrices.create(req.body)
    .then((data)=>res.json(data))
    .catch(next);
  }
  else{
    res.json({error:'The input field is empty',});
  }
});
router.delete('/foodlist/:id', (req, res, next) => {
  // delete placeholder
  FoodPrices.findOneAndDelete({_id:req.params.id})
  .then((data)=>res.json(data))
  .catch(next);
});
module.exports = router;