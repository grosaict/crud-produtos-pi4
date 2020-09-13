const controller = require('./controllers/controller')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/product',         controller.list)
app.get('/product/:id',     controller.getById)
app.post('/product',        controller.insert)
app.put('/product/:id',     controller.update)
app.delete('/product/:id',  controller.delete)

app.listen(port, () => {
    console.log(`Iniciando o servidor: http://localhost:${port}`)
})