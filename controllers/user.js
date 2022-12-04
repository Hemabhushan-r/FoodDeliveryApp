const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const Users=require('../models/user');
const UserCart=require('../models/userCartItems');
const signin=async (req,res)=>{
    const {email,password,role}=req.body
    try{
        const existingUser=await Users.findOne({email:email,role:role})
        if(!existingUser){
            return res.status(404).json({message:"User doesn't exist as "+role})
        }
        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:'1h'})
        const userCart=await UserCart.findOne({name:existingUser.name,email:existingUser.email})
        res.status(200).json({result:existingUser,token,cartItems:userCart.cartItems})
    }catch(error){
        res.status(500).json({message:'Something went wrong'})
    }
}
const signup=async (req,res)=>{
    const {email,password,confirmpassword,name,number,role}=req.body
    try{
        const existingUser=await Users.findOne({email:email,role:role})
        if(existingUser){
            return res.status(400).json({message:"User already exists as "+role})
        }
        if(password!=confirmpassword){
            return res.status(400).json({message:"Passwords don't match"})
        }
        const hashedPassword=await bcrypt.hash(password,12)
        const result=await Users.create({email:email,password:hashedPassword,name:name,number:number,role:role})
        const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'1h'})
        const userCart=await UserCart.create({name:result.name,email:result.email,cartItems:[]})
        res.status(200).json({result,token,cartItems:userCart.cartItems})
    }
    catch(error){
        res.status(500).json({message:'Something went wrong'})
    }
}
exports.signin=signin

exports.signup=signup