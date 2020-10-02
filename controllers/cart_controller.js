const Cart = require('../models/cart')

exports.list = (req, res) => {
    Cart.find({},(err, Cart) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(Cart);
    });
}

exports.insert = (req, res) => {
    let newCart = new Cart(req.body);
    newCart.save((err, cart) => {
        if(err) {
            res.send(err);
        }
        res.status(201).json(cart);
    });
}
   
exports.update = (req, res) => {
    let id = req.params.id;
    let cartToUpdate = req.body;
    Cart.findOneAndUpdate({ _id: id }, cartToUpdate, { new: true }, (err, cartUpdated) => {
        if(err){
            res.send(err);
        }
        res.json(cartUpdated);
    });
}
   
exports.delete = (req, res) => {
    let id = req.params.id;
    Cart.findOneAndDelete({ _id: id }, (err, cartToDelete) => {
        if(err){
            res.send(err);
        }
        res.json(cartToDelete);
    });
}