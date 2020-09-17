const express = require('express') //import express
const app = express() //creates const for use express
const mongoose = require('mongoose') //import mongoose
const port = 3000 //define application port

const productRoute  = require('./routes/product_routes') //import routes of product
const userRoute     = require('./routes/user_routes') //import routes of user

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Mongoose Configuration
mongoose.connect('mongodb://localhost:27017/app_products', { //Use data base name at this line
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

//Middleware for Log
app.use((req, resp, next) => {
  console.log("Request Time: "+Date.now());
  console.log("Method: "+ req.method)
  next();
});

app.use('/api/product', productRoute) //creates a route base for product
app.use('/api/user',    userRoute) //creates a route base for user

app.listen(port, () => {
    console.log(`Iniciando o servidor: http://localhost:${port}`)
})