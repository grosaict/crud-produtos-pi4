exports.list = (req, res) => {
    obj = [
        {id:1, name:"Produto A", price:30000},
        {id:2, name:"Produto B", price:25000},
        {id:3, name:"Produto C", price:30600}
    ]
    res.json(obj)
}

exports.getById = (req, res) => {  
    res.json({id:req.params.id, name:"Produto X", price:22000})
}
   
exports.insert = (req, res) => {
    res.json({id:1, name:req.body.name, price:req.body.price})
    /*
        To send simple request use: 
            res.json(req.body)

        Object example to use in Postman:
        {
            "name":     "Produto A",
            "price":    "1000"
        }
    */
}
   
exports.update = (req, res) => {
    res.json({id:req.params.id, name:"Produto X", price:22000})
}
   
exports.delete = (req, res) => {
    res.json({id:req.params.id, name:"Produto X", price:22000})
}