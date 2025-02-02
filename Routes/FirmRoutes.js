const FirmController = require('../Controllers/FirmController')
const express = require('express')
const VerifyToken = require('../Middleware/VerifyToken')
const path = require('path')
const router = express.Router()


router.post('/add-firm',VerifyToken, FirmController.Addfirm)
router.post('/:imageName',(req,res)=>{
    const imageName = req.file.imageName
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})
router.delete('/deleteFirm/:id',FirmController.deleteFirmbyId)

module.exports = router