const express = require('express') //import express
const cors = require('cors')  //import cors
const app = express() //creates const for use express
const mongoose = require('mongoose') //import mongoose
const port = 3000 //define application port

const tokenRoute      = require('./routes/token_routes') //import routes of token
const productRoute    = require('./routes/product_routes') //import routes of product
const userRoute       = require('./routes/user_routes') //import routes of user
const cartRoute       = require('./routes/cart_routes') //import routes of cart

const tokenController = require('./controllers/token_controller') //import user controller

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

//Mongoose Configuration
mongoose.connect('mongodb://localhost/app_products', { //Use data base name at this line
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

app.use('/api/auth',    tokenRoute) //creates a route base for token
app.use('/api/product', /* tokenController.tokenCheck,  */productRoute) //creates a route base for product
app.use('/api/user',    /* tokenController.tokenCheck,  */userRoute) //creates a route base for user
app.use('/api/cart',    /* tokenController.tokenCheck,  */cartRoute) //creates a route base for cart

app.listen(port, () => {
    console.log(`Iniciando o servidor: http://localhost:${port}`)
})