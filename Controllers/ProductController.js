const Product = require('../Models/Product')
const Firm = require('../Models/Firm')

const multer = require('multer')
const path = require('path')




const storage = multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(null, Date.now()+'__'+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})


const AddProduct = async(req,res)=>{
    try {

        const {productname, price, category, bestSeller, description} = req.body

        const image = req.file ? req.file.filename:undefined

        const firmId = req.params.id

        const firm = await Firm.findById(firmId)
        if(!firm){
            res.status(404).send({error: "firm not found"})
        }


        const product = new Product({
            productname, price, category, bestSeller, description, firm:firm._id
        })

        const savedfirm = await product.save()
        firm.product.push(savedfirm)
        firm.save()
        res.status(200).send({message:"Product added successfully"})


        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error occured"})
    }
}


const getAllProducts = async(req,res)=>{

   try {
    const firmId = req.params.id
    const firm = await Firm.findById(firmId)
    if(!firm){
        res.status(404).send({error:"firm not found"})
    }

    const products = await Product.find({firm:firm})

    const resturantName = firm.firmname

    res.status(200).send({ resturantName,products})
    
   } catch (error) {

    console.log(error)
        res.status(500).json({error:"Internal server error occured"})
    
   }
}

const getProductBYID = async(req,res)=>{
try {
    
    const productId = req.params.id

    const product = await Product.findById(productId)
    if(!product){
        res.status(404).send({error:"product not found"})
    }

    res.status(200).send({product})
    
} catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal server error occured"})
    
}

}

const deleteProductById = async(req,res)=>{
 try {

    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId)
    if(!product){
        res.status(404).send({error:"error occured"})
    }

    
    

    res.status(200).send({message:'producted deleted sucessfully'})
    
 } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal server error occured"})
    
 }
}

module.exports = {AddProduct:[upload.single('image'),AddProduct], getAllProducts, getProductBYID, deleteProductById}