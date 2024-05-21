const User = require('../model/user-model')

const userRegisterValidation = ({
    username:{
        in: ['body'],
        exists:{
            errorMessage:'username is required'
        },
        notEmpty:{
            errorMessage:'username cannot be empty'
        },
        trim:true
    },
    email:{
        in: ['body'],
        exists:{
            errorMessage:'email is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
        isEmail:{
            errorMessage:'Email cannot be empty'
        },
        custom: {
            options: async function(value){
                const user = await User.findOne({ email: value })
                if(user) {
                    throw new Error('email already taken')
                } else {
                    return true 
                }
            }
        },
        trim: true,
        normalizeEmail: true 
    },
    password:{
        in: ['body'],
        exists:{
            errorMessage:'password is required'
        },
        notEmpty:{
            errorMessage:'password cannot be empty'
        },
        isLength: {
            options: {min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters'
        },
        trim: true 
    },
    bio:{
        in: ['body'],
        exists:{
            errorMessage:'bio is required'
        },
        notEmpty:{
            errorMessage:'bio cannot be empty'
        },
        trim:true
    }
})

const userLoginValidationSchema = {
    email: {
     in: ['body'],
     exists: {
         errorMessage: 'email is required'
     },
     notEmpty: {
         errorMessage: 'email cannot be empty'
     },
     isEmail: {
         errorMessage: 'email should be a valid format'
     },
     trim: true,
     normalizeEmail: true,
 },
 password: {
     in: ['body'],
     exists: {
         errorMessage: 'password is required'
     },
     notEmpty: {
         errorMessage: 'password cannot be empty'
     },
     isLength: {
         options: { min: 8, max: 128 },
         errorMessage: "password should be between 8-128 character"
     },
     
     trim: true
 }
}

const userUpdateValidationSchema={
    username:{
        in: ['body'],
        exists:{
            errorMessage:'username is required'
        },
        notEmpty:{
            errorMessage:'username cannot be empty'
        },
        trim:true
    },
    email:{
        in: ['body'],
        exists:{
            errorMessage:'email is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
        isEmail:{
            errorMessage:'Email cannot be empty'
        },
        custom: {
            options: async function(value){
                const user = await User.findOne({ email: value })
                if(user) {
                    throw new Error('email already taken')
                } else {
                    return true 
                }
            }
        },
        trim: true,
        normalizeEmail: true 
    },
    password:{
        in: ['body'],
        exists:{
            errorMessage:'password is required'
        },
        notEmpty:{
            errorMessage:'password cannot be empty'
        },
        isLength: {
            options: {min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters'
        },
        trim: true 
    },
    bio:{
        in: ['body'],
        exists:{
            errorMessage:'bio is required'
        },
        notEmpty:{
            errorMessage:'bio cannot be empty'
        },
        trim:true
    }
}

module.exports={
    userRegisterValidation,
    userLoginValidationSchema,
    userUpdateValidationSchema
      
}