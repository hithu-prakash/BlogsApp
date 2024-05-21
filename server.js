require('dotenv').config()

const configDB = require('./Backend/app/config/db')
const { checkSchema } = require('express-validator')

const express = require('express')
const app = express()
const PORT = process.env.PORT


const  fs = require('fs')
const morgan = require('morgan')
const path = require('path')

//validations
const {userRegisterValidation,userLoginValidationSchema,userUpdateValidationSchema}= require('./Backend/app/validations/user-validation')
//const {userLoginValidationSchema} = require('./Backend/app/validations/user-validation')


//models
const userCntrl=require('./Backend/app/controllers/user-cntrl')

const authenticateUser=require('./Backend/app/middleware/authentication')


configDB()

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms' /* 'common '*/, {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }))


app.post('/user/register',checkSchema(userRegisterValidation),userCntrl.register)
app.post('/user/login',checkSchema(userLoginValidationSchema),userCntrl.login)
app.get('/user/account',authenticateUser,userCntrl.account)
app.put('/user/update',authenticateUser,checkSchema(userUpdateValidationSchema),userCntrl.update)
app.delete('/user/delete',authenticateUser,userCntrl.delete)

app.listen(PORT,()=>{
    console.log('port running FINE!!')
})