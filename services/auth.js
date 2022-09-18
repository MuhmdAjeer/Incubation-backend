const asyncHandler  = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../model/users')
const jwt = require('jsonwebtoken')

module.exports = {
    // @desc does login for user
    // @route /login
    // @access Public
    doUserSignup : asyncHandler(async(req,res,next)=>{
        // VALIDATE
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            res.status(400)
            throw new Error('Didnt receive all credentials')
        }
        // CHECK USER EXIST
        const userExist = await User.findOne({email})
        if(userExist){
            res.status(400)
            throw new Error('User already exists')
        }
        //  REGISTER USER
        const user = await User.create({
            name : name,
            email : email,
            password : (await bcrypt.hash(password,10))
        })
        console.log(user);
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token : generateJWT(user.id,user.name)
        })
    }),
    doUserLogin : asyncHandler(async(req,res)=>{
        //validate
        console.log(req.body);
        const {email,password} = req.body
        if(!email || !password){
            res.status(400)
            throw new Error('Didnt received full credentials')
        }

        //check if exists
        const user = await User.findOne({email})
        if(!user){
            res.status(404);
            throw new Error('No users Found');
        } 

        if((await bcrypt.compare(password,user.password))){
            res.status(200).json({
                _id : user.id,
                name : user.name,
                email : user.email,
                token : generateJWT(user.id,user.name)
            })
        }else{
            res.status(400)
            throw new Error('Email and password doesnt match')
        }
    })

    
    
}
//generate jwt
const generateJWT = (id,name)=>{
    return jwt.sign({ id , name} , process.env.JWT_SECRET , { expiresIn : '30d' })
}