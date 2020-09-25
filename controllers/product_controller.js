const Product = require('../models/product')

exports.list = (req, res) => {
    Product.find({},(err, Product) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(Product);
    });
}

exports.getById = (req, res) => {  
    let id = req.params.id;
    Product.findById(id, (err, product) => {
        if(err)
            res.status(500).send(err);        
        res.json(product);
    });
}

exports.getByName = (req, res, next) => {
    if (req.query && req.query.name){
        const paramName = req.query.name;
        console.log(paramName);
        Product.find({name: paramName}, (err, products) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(products);
        });
    }
}

exports.insert = (req, res) => {
    let newProduct = new Product(req.body);
    newProduct.save((err, product) => {
        if(err) {
            res.send(err);
        }
        res.status(201).json(product);
    });
}
   
exports.update = (req, res) => {
    let id = req.params.id;
    let productToUpdate = req.body;
    Product.findOneAndUpdate({ _id: id }, productToUpdate, { new: true }, (err, productUpdated) => {
        if(err){
            res.send(err);
        }
        res.json(productUpdated);
    });
}
   
exports.delete = (req, res) => {
    let id = req.params.id;
    Product.findOneAndDelete({ _id: id }, (err, productToDelete) => {
        if(err){
            res.send(err);
        }
        res.json(productToDelete);
    });
}