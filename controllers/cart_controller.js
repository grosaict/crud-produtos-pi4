const Cart = require('../models/cart')

exports.list = (req, res) => {
    Cart.find({},(err, Cart) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(Cart);
    });
}

exports.getByCustomer = (req, res, next) => {
    let id = req.params.id;
    Cart.find({customerId: id}, (err, cart) => {
        if(err){
            err.teamMsg = "Carrinho vazio!!";
            res.status(500).send(err);
        }
        res.status(202).json(cart);
    });
}
   
exports.update = (req, res) => {
    const reqCart  = new Cart(req.body);
    console.log(JSON.stringify(reqCart))
    if (reqCart.customerId && reqCart.items){
        Cart.findOne({customerId: reqCart.customerId}, (errFind, cartFind) => {
            //console.log(JSON.stringify(cartFind))
            if(errFind){ // If not exist, insert a new one
                reqCart.save((errSave, cartSaved) => {
                    if(errSave) {
                        res.send(errSave);
                    }
                    res.status(201).json(cartSaved);
                });
            }else{
                let cartToUpdate = updateCart (reqCart, cartFind);
                /* Cart.findOneAndUpdate({ _id: cartToUpdate.id }, cartToUpdate, { new: true }, (errUpdate, cartUpdated) => {
                    if(errUpdate){
                        res.status(500).send(errUpdate);
                    }
                    res.status(202).json(cartUpdated);
                }); */
                res.status(202).json(cartToUpdate);
            }
        });
    }else{
        res.status(400).send({"message" : "Requisição inválida"});
    }
}

function updateCart (reqCart, cartToUpdate){
    try {
        cartToUpdate = reqCart;
        cartToUpdate.amount = 0;
        cartToUpdate.items.forEach(item => {
            cartToUpdate.amount = (item.price * item.qtd) - item.discount;
        });
        return cartToUpdate;
    } catch (err){
        console.log(err);
    }
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