const express = require('express');
const router = express.Router();
const FoodPrices=require('../models/foodlist');
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