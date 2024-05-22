const _ = require("lodash")
const Post = require('../model/post-model')
const {validationResult}=require('express-validator')

const postCntrl={}

postCntrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}) 
   }
   try{
   const body=req.body
   const post=new Post(body)
   post.author=req.user.id
   await post.save()
   res.status(200).json(post)
  }
  catch(err){
    res.status(500).json({errors:err.msg})
  }
}

postCntrl.posts=async(req,res)=>{
try{
    const post=await Post.find()
   res.status(200).json(post)
    }
    catch(err){
    res.status(500).json({errors:err})
   }
}

postCntrl.single=async(req,res)=>{
   try{ 
    const id=req.params.id
    const post=await Post.findById(id)
    res.status(200).json(post)
    }catch(err){
        res.status(500).json({errors:err})
    }
}

postCntrl.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{
          const body=req.body
          const id=req.params.id
          const post=await Post.findOneAndUpdate({author:req.user.id,_id:id},body,{new:true})
          if(!post){
            return res.status(404).json({errors:'record not found'})
          }
          res.status(200).json(post)
    }catch(err){
        console.log(err)
           res.status(500).json({errors:'somthing went wrong'})
    }
}

postCntrl.delete=async(req,res)=>{
    try{
          
          const id=req.params.id
          const post=await Post.findOneAndDelete({author:req.user.id,_id:id},{new:true})
          if(!post){
            return res.status(404).json({errors:'record not found'})
          }
          res.status(200).json(post)
    }catch(err){
           res.status(500).json({errors:'somthing went wrong'})
    }
}

postCntrl.myPosts=async(req,res)=>{
    try{
         const posts=await Post.find({author:req.user.id})
         if(!posts){
            return res.status(404).json({errors:'record not found'})
         }
         res.status(200).json(posts)
    }catch(err){
         res.status(500).json({errors:'somthing went wrong'})
    }
}

module.exports=postCntrl
