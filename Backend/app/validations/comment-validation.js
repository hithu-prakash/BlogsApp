const Comment=require('../model/comment-model')
const commentValidations={
    content:{
        in:['body'],
        exists:{
            errorMessage:'content is required'
        },
        notEmpty:{
            errorMessage:'content cannot be empty'
        },
        trim:true
    },
    post:{
        in:['params'],
        custom: {
            options: async function( value,{ req }){
                const comment = await Comment.findOne({ post: req.params.postId, author: req.user.id })
                if(comment) {
                    throw new Error('You have already commented this post')
                }
                return true 
            }
        }
    },
    isMongoId:{
        errorMessage:'should be valid mongo id'
    },
}

const commentEditValidation={
  content:{ 
    in:['body'],
    exists:{
    errorMessage:'content is required'
    },
    notEmpty:{
        errorMessage:'content cannot be empty'
    }
  },
//   post:{
//   isMongoId:{
//     errorMessage:'should be valid mongo id'
//   }
 }


// const idValidationSchema={
//     post:{
//     in:['params'],
//     isMongoId:{
//         errorMessage:'should be valid mongo id'
//     }
// }
//}
module.exports={commentValidations,commentEditValidation}