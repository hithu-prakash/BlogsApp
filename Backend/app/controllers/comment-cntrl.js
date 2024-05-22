const Comment=require('../model/comment-model')
const {validationResult}=require('express-validator')

const commentCntrl={}

commentCntrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const postId=req.params.id
    try{
        const comment=new Comment(body)
        comment.author=req.user.id
        comment.post=postId
        await comment.save()
         return res.json(comment)

    }
    catch(e){
        console.log(e)
        return res.status(500).json("internal error")
    }

}

commentCntrl.get=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const postId=req.params.id
    try{
        const comment=await Comment.find({postId})
        if(!comment){
            return res.json("record not found")
        }
        return res.json(comment)
    }
    catch(e){
        console.log(e)
        return res.status(500).json("internal errors")
    }


}

commentCntrl.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const postId=req.params.id
    const commentId=req.params.commentId
    try{
        const comment=await Comment.findOneAndUpdate({author:req.user.id,post:postId,_id:commentId},body,{new:true})
        if(!comment){
            return res.json("record not found")
        }
        return res.json(comment)
    }
    catch(e){
        console.log(err)
        return res.status(500).json("internal errors")
    }

}

commentCntrl.delete=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const postId=req.params.id
    const commentId=req.params.commentId
    try{
        const comment=await Comment.findOneAndDelete({author:req.user.id,post:postId,_id:commentId},body,{new:true})
        if(!comment){
            return res.json("record not found")
        }
        return res.json(comment)
    }
    catch(e){
        console.log(e)
        return res.status(500).json("internal errors")
    }
}

module.exports=commentCntrl