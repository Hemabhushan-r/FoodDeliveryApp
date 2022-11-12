const express = require('express');
const router = express.Router();
const FoodPrices=require('../models/foodlist');
const Restaurants=require('../models/restaurants');
const {signin,signup}=require('../controllers/user');

router.post('/signin',signin)
router.post('/signup',signup)

module.exports=router