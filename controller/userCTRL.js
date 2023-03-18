const User=require('../models/userModel');
const asyncHandler=require("express-async-handler");
const { generateToken } = require('../config/jwtToken');
const createUser=asyncHandler(async(req,res)=>{

    const email=req.body.email;
    const findUser=await User.findOne({email:email});
    if(!findUser){
        //create new user
        const newUser=await User.create(req.body);
        res.json(newUser);

    }
    else{
        throw new Error("User Already Exist");
    }
});
const loginUserCtrl=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    //check if user exist or not
    const findUser=await User.findOne({email});
    if (findUser && await findUser.isPasswordMatched(password)){
res.json({
    _id: findUser?._id,
    firstname:findUser?.firstname,
    lastname :findUser.lastname,
    email :findUser.email,
    mobile:findUser.mobile,
    token:generateToken(findUser._id),

});
    }else{
        throw new Error("Invalid Credentials");
    }
})

//update User
const updateAUser=asyncHandler(async(req,res)=>{
    console.log(req.user);
    const{id}=req.user;
    try{
const updateAUser=await User.findByIdAndUpdate(id,{
    firstname:req?.body?.firstname,
        lastname:req?.body?.lastname,
        email:req?.body?.email,
        mobile:req?.body?.mobile
},{
    new:true,
})
res.json(updateAUser);
    }
    catch(error){
throw new Error(error);
    }
})


//get all users 
const getAllUser=asyncHandler(async(req,res)=>{
    try{
        const getUsers=await User.find();
        res.json(getUsers)
    }
    catch(error){
        throw new Error(error)
    }
    
})

//get a single user
const getAUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
 const getAUser=await User.findById(id);
res.json({
    getAUser
})
    }
catch(error){
        throw new Error(error);
    }});

    //get a single user
const deleteAUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
 const deleteAUser=await User.findByIdAndDelete(id);
res.json({
    deleteAUser
})
    }
catch(error){
        throw new Error(error);
    }});


module.exports={createUser,loginUserCtrl,getAllUser,getAUser,deleteAUser,updateAUser}