const path = require('path')
const ProductController = require('../Controllers/ProductController')
const express = require("express")
const router = express.Router()


router.post('/add-product/:id', ProductController.AddProduct)
router.get('uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName
    res.header('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})
router.get('/:id/all-products',ProductController.getAllProducts)
router.get('/singleProduct/:id', ProductController.getProductBYID)
router.delete('/deleteProduct/:id',ProductController.deleteProductById)
module.exports = router