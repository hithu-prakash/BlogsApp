require('dotenv').config()

const configDB = require('./Backend/app/config/db')
const { checkSchema } = require('express-validator')

const express = require('express')
const cors= require('cors')
const app = express()
const PORT = process.env.PORT


const  fs = require('fs')
const morgan = require('morgan')
const path = require('path')

//validations
const {userRegisterValidation,userLoginValidationSchema,userUpdateValidationSchema}= require('./Backend/app/validations/user-validation')
const {postValidation,postEditValidation}=require('./Backend/app/validations/post-validation')
const {commentValidations,commentEditValidation,idValidationSchema}=require('./Backend/app/validations/comment-validation')


//models
const userCntrl=require('./Backend/app/controllers/user-cntrl')
const postCntrl=require('./Backend/app/controllers/post-cntrl')
const commentCntrl=require('./Backend/app/controllers/comment-cntrl')

const authenticateUser=require('./Backend/app/middleware/authentication')


configDB()

app.use(express.json())
app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms' /* 'common '*/, {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }))

//user
app.post('/user/register',checkSchema(userRegisterValidation),userCntrl.register)
app.post('/user/login',checkSchema(userLoginValidationSchema),userCntrl.login)
app.get('/user/account',authenticateUser,userCntrl.account)
app.put('/user/update',authenticateUser,checkSchema(userUpdateValidationSchema),userCntrl.update)
app.delete('/user/delete',authenticateUser,userCntrl.delete)

//post
app.get('/api/posts',postCntrl.posts)
app.get('/api/posts/myPosts',authenticateUser,postCntrl.myPosts)
app.get('/api/posts/:id',postCntrl.single)
app.post('/api/posts',authenticateUser,checkSchema(postValidation),postCntrl.create)
app.put('/api/posts/:id',authenticateUser,checkSchema(postEditValidation),postCntrl.update)
app.delete('/api/posts/:id',authenticateUser,postCntrl.delete)

//comment
app.post('/api/posts/:postId/comments',authenticateUser,checkSchema(commentValidations),commentCntrl.create)
app.get('/api/posts/:postId/comments',commentCntrl.get)
app.put('/api/posts/:postId/comments/:commentId',authenticateUser,checkSchema(commentEditValidation),commentCntrl.update)
app.delete('/api/posts/:postId/comments/:commentId',authenticateUser,commentCntrl.delete)



app.listen(PORT,()=>{
    console.log('port running FINE!!')
})