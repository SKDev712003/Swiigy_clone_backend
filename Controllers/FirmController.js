const Firm = require("../Models/Firm")
const Vendor = require('../Models/Vendor')
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });


const upload = multer({storage:storage})

const Addfirm = async(req,res)=>{
   try {

    const {firmname, area, category, region, offer} = req.body
    const image = req.file ? req.file.filename:undefined

    const vendor = await Vendor.findById(req.vendorId)
    if(!vendor){
        res.status(404).send({error:"vendor not found"})
    }

    if(vendor.firm.length>0){
        res.status(400).send({message:"vendor should only have one firm"})
    }else{

    const firm = new Firm({
        firmname, area, category, region, offer, image, vendor:vendor._id
    })

    

    const savedFirm = await firm.save()
    const firmId = savedFirm._id
    
    vendor.firm.push(savedFirm)
    await vendor.save()
    
    const resturantName = savedFirm.firmname
    res.status(200).send({message:"firm added successfully",firmId, resturantName})
    
    }
    
   } catch (error) {

    console.log(error)
    res.status(500).json({error:"Internal server error occured"})
    
   }
}

const deleteFirmbyId = async(req,res)=>{
    try {

        const firmId = req.params.id

        const deleteFirm = await Firm.findByIdAndDelete(firmId)
        if(!deleteFirm){
            res.status(200).send({error:"error occured"})
        }

        res.status(200).send({message:"firm deleted sucessfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error occured"})
        
    }
}

module.exports = {Addfirm:[upload.single('image'), Addfirm, ],deleteFirmbyId}