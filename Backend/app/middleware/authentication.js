const jwt = require('jsonwebtoken')
const authenticateUser=(req,res,next) =>{
    const token=req.headers['authorization']
    if(!token){
        return res.status(404).json({errors:'token is required'})
    } 
    try {
        const tokenData = jwt.verify(token,process.env.SECRET_KEY)
        req.user=tokenData
        next()
    } 
    catch(err) {
        return res.status(500).json('internal errors')
    }
    
}

module.exports = authenticateUser