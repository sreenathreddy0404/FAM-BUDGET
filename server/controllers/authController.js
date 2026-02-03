const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register a new user
const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        //before storing check if the user is already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success : false,message : "User already exists!",});
        }

        //create user
        const user = await User.create({name,email,password});
        
        //Generate JWT token
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'});

        res.status(201).json({success: true,message: "User registered successfully!",token,username: user.name});
    }catch(e){
        return res.status(500).json({success: false,message: "Server error"});
    }
}

//Login User
const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;

        //Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success: false,message: "Invalid credentials!"});
        }

        //compare passwords
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(404).json({success: false,message: "Invalid credentials!"});
        }

        //Generate JWT token
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'});

        res.status(200).json({success: true,message: "login successful",token,username:user.name});
    }catch(e){
        return res.status(500).json({success: false,message: "Server error",error: e.message});
    }
}

module.exports = {registerUser,loginUser};