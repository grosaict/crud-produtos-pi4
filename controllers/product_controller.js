exports.list = (req, res) => {
    let products = new Object();
    products = [
        {id:1, name:"Produto A", price:30000},
        {id:2, name:"Produto B", price:25000},
        {id:3, name:"Produto C", price:30600}
    ]
    res.json(products)
}

exports.getById = (req, res) => {  
    //res.json({id:req.params.id, name:"Produto X", price:22000})
    if(req.params.id == 1){
        let product = new Object();
        product.id = req.params.id;
        product.name = 'Produto X';
        product.price = 22000;
        res.json(product);
    }
    else {
        res.sendStatus(404);
    }
}
   
exports.insert = (req, res) => {
    /*  To send simple request use: 
            res.json(req.body)

        Object example to use in Postman:
        {
            "name":     "Produto A",
            "price":    1000
        }
    res.json({id:1, name:req.body.name, price:req.body.price})*/
    let product = new Object();
        product.id = 1;
        product.name = req.body.name;
        product.price = req.body.price;
    res.status(201).json(product);
}
   
exports.update = (req, res) => {
    //res.json({id:req.params.id, name:"Produto X", price:22000})
    if(req.params.id == 2){
        let product = req.body;
        product.id = req.params.id;
        product.price += 22000;
        res.json(product);
    }
    else {
        res.sendStatus(404);
    }
}
   
exports.delete = (req, res) => {
    //res.json({id:req.params.id, name:"Produto X", price:22000})
    if(req.params.id == 3){
        let product = new Object();
        product.id = req.params.id;
        product.name = 'Produto X';
        product.price = 22000;
        res.json(product);
    }
    else {
        res.sendStatus(404);
    }
}