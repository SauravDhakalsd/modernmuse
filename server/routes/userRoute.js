const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const eah = require("express-async-handler")
// Register user
router.post('/register', async (req, res) => {
    try {
        const { userName, address, contact, email, password } = req.body;
        const user = new User({ userName, address, contact, email, password });
        await user.save();
        res.status(201).json({success:true,message:'User registered successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message});
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(404).json({success:false,message:'User not found'});
        if(!user.isApproved) return res.status(404).json({success:false,message:'User not approved'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({sucess:false,message:'Invalid credentials'});
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.json({success:true,message:"User loggin successfull",data:{
            role:user.role,token: token
        } });
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message});
    }
});
router.get("/profile",authMiddleware,eah(async(req,res)=>{
    const user = await User.findById(req.user.id)
    res.json({success:true,data:user})
}))
router.put("/hip/:size",authMiddleware,eah(async(req,res)=>{
    if(!req.user.role==="admin") throw new Error("Access denied")
    const size = req.params.size;
    const user = await User.findByIdAndUpdate(req.user.id,{hip:size});
    res.json({success:true,message:"Hip size updated sucessfully"})
}))
router.put("/shoulder/:size",authMiddleware,eah(async(req,res)=>{
    if(!req.user.role==="admin") throw new Error("Access denied")

    const size = req.params.size;
    const user = await User.findByIdAndUpdate(req.user.id,{shoulder:size});
    res.json({success:true,message:"Hip size updated sucessfully"})
}))
router.get("/pending",authMiddleware,eah(async(req,res)=>{
    if(!req.user.role==="admin") throw new Error("Access denied")

    const users = await User.find({isApproved:false})
    res.json({success:true,data:users})
}))
router.put("/:id/approve",authMiddleware,eah(async(req,res)=>{
    if(!req.user.role==="admin") throw new Error("Access denied")

    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id,{isApproved:true})
    res.json({success:true,message:"User approved"})
}))

router.delete("/:id",authMiddleware,eah(async(req,res)=>{
    if(!req.user.role==="admin") throw new Error("Access denied")
    await User.findByIdAndDelete(req.params.id)
}))
module.exports = router;
