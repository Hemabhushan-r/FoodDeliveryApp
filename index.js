const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors')
const routes = require('./routes/api');
const userRoutes=require('./routes/users')
require('dotenv').config(); 

const app = express();
var corsOptions={
  origin:"http://localhost:5001"
}
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));
mongoose.Promise=global.Promise;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api',routes);
app.use('/user',userRoutes)
app.use((err,req,res,next)=>{
    console.log(err);
    next();
})
app.use((req, res, next) => {
  //res.send('Welcome to Express');
  next()
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});