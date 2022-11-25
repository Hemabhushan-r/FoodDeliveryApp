const express = require('express');
const router = express.Router();
const FoodPrices=require('../models/foodlist');
const Restaurants=require('../models/restaurants');
const UserCart=require('../models/userCartItems');
router.get('/restaurant_list',(req,res,next)=>{
  Restaurants.find({})
    .then(data=>{
      res.send(data)
    })
    .catch(err=>{
      console.log(err)
    })
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