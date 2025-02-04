const path = require('path')
const ProductController = require('../Controllers/ProductController')
const express = require("express")
const router = express.Router()


router.post('/add-product/:id', ProductController.AddProduct)


router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;

    // Define the absolute path for the image
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);

    // Set the response content type to image/jpeg
    res.header('Content-Type', 'image/jpeg');

    // Send the image file if it exists, else return a 404 error
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(err.status || 404).send('Image not found');
        }
    });
});



router.get('/:id/all-products',ProductController.getAllProducts)
router.get('/singleProduct/:id', ProductController.getProductBYID)
router.delete('/deleteProduct/:id',ProductController.deleteProductById)
module.exports = router