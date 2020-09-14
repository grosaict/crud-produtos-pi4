const express = require('express') //import express
const app = express() //creates const for use express
const port = 3000 //define application port
//import routes of product
const productRoute = require('./routes/product_routes')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/* const controller = require('./controllers/product_controller')
app.get     ('/product',        controller.list)
app.get     ('/product/:id',    controller.getById)
app.post    ('/product',        controller.insert)
app.put     ('/product/:id',    controller.update)
app.delete  ('/product/:id',    controller.delete) */ 

//creates a route base for product
app.use('/api/product', productRoute)

app.listen(port, () => {
    console.log(`Iniciando o servidor: http://localhost:${port}`)
})