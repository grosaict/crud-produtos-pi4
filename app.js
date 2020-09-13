const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/product', (req, res) => {
    res.json([{id:1, name:"produto 1", price:30.000}])
    res.send('Rota para buscar todos os produtos')
})
   
app.get('/product/:id', (req, res) => {
    res.json([{id:1, name:"produto 1", price:30.000}])
    res.send('Rota para buscar o produto '+ req.params.id)
})
   
app.post('/product', (req, res) => {
    res.json(req.body)
    res.send('Rota para incluir um produto')
})
   
app.put('/product/:id', (req, res) => {
    res.json([{id:1, name:"produto 1", price:30.000}])
    res.send('Rota para alterar o produto '+ req.params.id)
})
   
app.delete('/product/:id', (req, res) => {
    res.json([{id:1, name:"produto 1", price:30.000}])
    res.send('Rota para apagar o produto '+ req.params.id)
})

app.listen(port, () => {
    console.log(`Iniciando o servidor: http://localhost:${port}`)
})