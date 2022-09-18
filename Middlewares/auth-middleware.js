const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

module.exports = {
    verify : asyncHandler((req,res,next)=>{
        let token;
        //chcek if token send
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            res.user = {
                id : decoded.id,
                name : decoded.name
            }
            next()
         } catch (error) {
            res.status(401)
            throw new Error('Not authorized')
         }
         
        }
        if(!token){
           res.status(401)
           throw new Error('Not authorized , No token')
        }
    })
}