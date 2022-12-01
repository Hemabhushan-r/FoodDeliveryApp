var express=-require('express');
var app=express();
app.get("/",function(req,res)){
    res.send("<h1>welcome to express</h1>")

})
app.get("/sindhu/:id",function(req,res){
  res.send()  
}