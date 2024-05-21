const mongoose = require('mongoose')

const configDB = async() =>{
    try {
        const db= await mongoose.connect(process.env.DB_URL)
        console.log('Database ready!! Go ahead..')

    } catch(err) {
        console.log('DB not working Check Once',err)
    }
    
}

module.exports=configDB