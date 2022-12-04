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
const UserCartItemsmodel = require('../models/userCartItems');
const Users=require('../models/user');
const ActiveOrders=require('../models/activeorders');


router.get("/order/:amount", (req, res) => {
  try {
    const options = {
      amount: parseFloat(req.params.amount) * 100, // amount == Rs 10
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
        amount: parseFloat(req.body.amount) * 100, // amount == Rs 10 // Same As Order amount
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

router.post('/getdeliveryperson',async (req,res,next)=>{
  const {cust_name,cust_num,cust_email,cartDetails}=req.body
  try{
    
    const delivery_person=await Users.aggregate([{$match:{role:'delivery-personnel'}},{$sample:{size:1}}])
    const exist_active_order=await ActiveOrders.findOne({cust_name:cust_name,cust_num:cust_num,cust_email:cust_email
      ,deliveryperson_name:delivery_person[0].name,deliveryperson_num:delivery_person[0].number,deliveryperson_email:delivery_person[0].email,cartDetails:cartDetails})
    if(!exist_active_order){
      const active_order=await ActiveOrders.create({cust_name:cust_name,cust_num:cust_num,cust_email:cust_email
        ,deliveryperson_name:delivery_person[0].name,deliveryperson_num:delivery_person[0].number,deliveryperson_email:delivery_person[0].email,cartDetails:cartDetails})
    }
    
    if(!delivery_person){
      return res.status(404).json({message:'No Delivery Personnel Found'});
    }
    res.status(200).json({name:delivery_person[0].name,email:delivery_person[0].email,number:delivery_person[0].number})
  }
  catch(error){
    console.log(error)
    res.status(500).json({message:'Something went wrong'})
  }
})
router.post('/getcustomer',async (req,res,next)=>{
  const {deliveryperson_name,deliveryperson_num,deliveryperson_email}=req.body
  try{
    
    const active_order=await ActiveOrders.findOne({deliveryperson_name:deliveryperson_name,deliveryperson_num:deliveryperson_num,deliveryperson_email:deliveryperson_email})
    if(!active_order){
      return res.status(404).json({message:'No Active Order Found'});
    }
    res.status(200).json({name:active_order.cust_name,email:active_order.cust_email,number:active_order.cust_num,cartDetails:active_order.cartDetails})
  }
  catch(error){
    res.status(500).json({message:'Something went wrong'})
  }
})
router.get('/restaurant_list',(req,res,next)=>{
  Restaurants.find({})
    .then(data=>{
      res.send(data)
    })
    .catch(err=>{
      console.log(err)
    })
});
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
});
router.post('/updatecartItems',async (req,res,next)=>{
  const {name,email,cartItems}=req.body;
  let arrtoUpdate=[]
  try{
    const existing_usercartitems=await UserCart.findOne({name:name,email:email})
    if(existing_usercartitems.cartItems.length==0){
      arrtoUpdate=cartItems
    }
    else{
      for(let i=0;i<existing_usercartitems.cartItems.length;i++){
        for(let j=0;j<cartItems.length;j++){
          if(existing_usercartitems.cartItems[i].foodName!==cartItems[j].foodName){
            arrtoUpdate.push(cartItems[j])
          }
        }
      }
    }
    //console.log(cartItems)
    //console.log(arrtoUpdate)
    //console.log(existing_usercartitems)
    const usercartitems=await UserCart.updateOne({name:name,email:email},{$push:{cartItems:{$each:arrtoUpdate}}})
   // console.log(usercartitems)
    if(!usercartitems){
      return res.status(404).json({message:'User Cart Not Found'});
    }
    res.status(200).json({message:'Your cart data is stored'})
  }
  catch(error){
    res.status(500).json({message:'Soemthing went wrong'})
  }
});
router.post('/deletecartItems',async (req,res,next)=>{
  const {name,email}=req.body;
  try{
    const usercartitems=await UserCart.updateOne({name:name,email:email},{$set:{cartItems:[]}})
    const active_order=await ActiveOrders.deleteOne({cust_name:name,cust_email:email})
    if(!usercartitems){
      return res.status(404).json({message:'User Cart Not Found'});
    }
    res.status(200).json({message:'Your cart data has been deleted'})
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