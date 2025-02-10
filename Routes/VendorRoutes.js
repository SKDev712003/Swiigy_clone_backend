const vendorController = require('../Controllers/VendorController')
const express = require('express')

const router = express.Router()

router.post('/register',vendorController.vendorRegister)
router.post('/login',vendorController.vendorLogin)
router.get('/all-vendors', vendorController.getAllVendors)
router.get('/single/:id', vendorController.getSingleVendor)
router.delete('/:id',vendorController.deleteVendorById)

module.exports = router;