const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express();

const vendorRoutes = require('./Routes/VendorRoutes')
const firmRoutes = require('./Routes/FirmRoutes')
const productRoutes = require('./Routes/ProductRoute')


dotenv.config()

const Port = process.env.PORT||8000;

app.use(express.json())
app.use(cors())


//mongoose connection

mongoose.connect(process.env.Mongo_Uri)
.then(()=>{
    console.log("Mongodb connected sucessfully")
})
.catch((err)=>{
    console.log(err)
})


//Routes

app.use('/vendor',vendorRoutes)
app.use('/firm', firmRoutes )
app.use('/product',productRoutes)
app.use('/uploads', express.static('uploads'))


// interface

app.use((req,res)=>{
    res.send("<h1>Welcome to Backend part")
})



app.listen(Port, ()=>{
    console.log(`Server running at ${Port}`)
})