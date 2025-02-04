const Vendor = require('../Models/Vendor')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')


dotenv.config()

const secret = process.env.Secret;


const vendorRegister = async(req,res)=>{
    try {

        const {username, email, password} = req.body;

        const vendorEmail = await Vendor.findOne({email})
        if(vendorEmail){
            res.status(400).send({error:"Email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const vendor = new Vendor({
            username,
            email,
            password:hashedPassword
        })

        await vendor.save()
        res.status(200).send({message:"vendor registered successfully"})
        
    } catch (error) {

        console.log(error)
        res.status(500).json({error:"Internal server error occured"})
        
    }

}


const vendorLogin = async(req,res)=>{
    const {email,password} = req.body

   try {

    const vendor = await Vendor.findOne({email})
    if(!vendor||!(await bcrypt.compare(password,vendor.password))){
        res.status(404).send({error:"user credentials not found"})
    }
    const token = jwt.sign({vendorId:vendor._id},secret, {expiresIn:"1hr"})
    const vendorId = vendor._id
    res.status(200).send({message:'login success', token, vendorId })
    
   } catch (error) {

    console.log(error)
        res.status(500).json({error:"Internal server error occured"})
    
   }
}


const getAllVendors = async(req,res)=>{

    try {

        const vendors = await Vendor.find().populate('firm')
    if(!vendors){
        res.status(404).send({error:"vendor not found"})
    }

    res.status(200).send({vendors})
        
    } catch (error) {

        console.log(error)
        res.status(500).json({error:"Internal server error occured"})
    
        
    }
}

const getSingleVendor = async(req,res)=>{

    try {

        const vendorId = req.params.id

    const vendor = await Vendor.findById(vendorId).populate('firm')
    if(!vendor){
        res.status(404).send({error:"no vendor found"})
    }

    const firmId = vendor.firm[0]._id
    const firmName = vendor.firm[0].firmname
    console.log(firmId)
    return res.status(200).send({vendor, firmId,firmName})
    
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error occured"})
        
    }
}

module.exports = {vendorRegister, vendorLogin, getAllVendors, getSingleVendor}