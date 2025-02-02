const Vendor = require('../Models/Vendor')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

const secret = process.env.Secret

const VerifyToken = async(req,res,next)=>{

    const token = req.headers.token
    if(!token){
        res.status(404).send({error: "Token is required"})
    }

    try {

        const decoded = jwt.verify(token,secret)
        const vendor = await Vendor.findById(decoded.vendorId)
        if(!vendor){
            res.status(404).send({message:"vendor not found"} )
        }

        req.vendorId = vendor._id

        next()
        
    } catch (error) {

        
    console.log(error)
    res.status(500).json({error:"Internal server error occured"})
        
    }
}

module.exports = VerifyToken