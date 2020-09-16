const express = require('express') //import express
const app = express() //creates const for use express
const mongoose = require('mongoose') //import mongoose
const port = 3000 //define application port
//import routes of product
const productRoute = require('./routes/product_routes')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Mongoose Configuration
//Use data base name at this line
mongoose.connect('mongodb://localhost:27017/app_products', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(()=> {
    console.log('BD conectado');
  })
  .catch((error)=> {
    console.log('Error ao conectar ao BD');
  });
mongoose.Promise = global.Promise;

//creates a route base for product
app.use('/api/product', productRoute)

app.listen(port, () => {
    console.log(`Iniciando o servidor: http://localhost:${port}`)
})