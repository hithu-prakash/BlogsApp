const mongoose = require('mongoose')

const {Schema , model} = mongoose

const postSchema = new Schema ({
    title:String,
    content:String,
    author:{
        type:Schema.Types.ObjectId, 
        ref:'User'
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }],// not array of objects
    // tags:[
    //     Schema.Types.ObjectId
    // ],
    postImage:String
},{timestamps:true})

const post = model('Post', postSchema)

module.exports = post