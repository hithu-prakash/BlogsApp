const User = require('../model/user-model')
const {validationResult} = require('express-validator')
const bcryptjs=require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const userCntrl={}

userCntrl.register= async(req,res)=> {
    const errors=validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }
    const body = req.body
    try{
        //const user = await User.create(body)
        const salt = await bcryptjs.genSalt()
        const hashPassword = await bcryptjs.hash(body.password, salt)
        //console.log("hashPassword",hashPassword)
        //const user = new User(body)
        const user = new User({
            username: body.username,
            email: body.email,
            password: hashPassword,
            bio: body.bio,
            profilePic: req.file.path // Set profilePic if file is uploaded
        });
        //const user=new User(body)
        user.password = hashPassword
        await user.save()
        res.status(201).json(user)
    } catch(err) {
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

userCntrl.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }
  
    try {
        const body = _.pick(req.body,['email','password'])
        const user =await User.findOne({email:body.email})
        
        if(user) {
            const isAuth = await bcryptjs.compare(body.password,user.password)
            if(isAuth) {
                const tokenData = {
                    id:user._id
                }
                const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'7d'})
                res.json({token:token})
            } else {
                res.status(404).json({errors:'invalid Password'})
            }
        } else {
            res.status(404).json({errors:'invalid email'})
        }
    } catch(err){
        res.status(500).json({errors: 'something went wrong'})
    }
}

userCntrl.account=async(req,res)=>{
    try {
        const user = await User.findById(req.user.id)
        return res.json(user)
    } catch(err) {
        return res.status(500).json({errors:'something went wrong'})
    }
}

userCntrl.update=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }
    try {
        const body = req.body
        
        const user= await User.findByIdAndUpdate(req.user.id,body,{new:true})
        if (user.password) {
            const salt = await bcryptjs.genSalt()
            user.password = await bcryptjs.hash(user.password, salt)
            await user.save()
            return res.json(user) 
        }
        return res.json(user) 
    } catch(err) {
        console.log(err.message)
        return res.status(500).json({errors:'Something went wrong'})
    }
}

userCntrl.delete=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
    }
    try {
        const user = await User.findByIdAndDelete(req.user.id)
        return res.json(user)
    } catch(err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }

}

userCntrl.uploadProfilePicture=async(req,res)=>{
    try{
        const userId=req.user.id
        let profilePic=req.file.path

        profilePic=profilePic.replace(/\\/g,"/")

        const user=await User.findByIdAndUpdate(userId,{profilePic},{new:true})
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        res.status(200).json({message:"Profile picture updated successfully",user})
        }
    catch(e){
        return res.json("internal error")
    }
}

module.exports=userCntrl