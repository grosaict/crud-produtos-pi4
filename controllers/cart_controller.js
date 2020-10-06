const Cart      = require('../models/cart')
const ItemsCart = require('../models/itemsCart')
const User      = require('../models/user')
const Product   = require('../models/product')

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
            err.message = "Carrinho vazio!!";
            res.status(500).send(err);
        }
        res.status(200).json(cart);
    });
}
   
exports.update = (req, res) => {
    let userId = req.params.id;
    const items  = req.body;
    if (!(userId && items)){
        res.status(400).send({"message" : "Requisição inválida"});
    }else{
        User.find({ _id: userId }, (errUser, user) => {
            if(errUser){
                errUser.teamMsg = "Usuário não encontrado";
                res.status(500).send(errUser);
            } else {
                Cart.findOne({customerId: userId}, (errFound, cartFound) => {
                    if(errFound) {
                        res.status(500).send(errFound);
                    }
                    if(!cartFound){ // If not exist, insert a new one
                        let newCart = new Cart();
                        newCart.customerId = userId;
                        newCart = updateItems(items, newCart);
                        console.log(JSON.stringify(newCart))
                        newCart.save((errSave, cartSaved) => {
                            if(errSave) {
                                res.status(500).send(errSave);
                            }
                            res.status(201).json(cartSaved);
                        });
                    }else{
                        let cartToUpdate = new Cart();
                        cartToUpdate = updateItems(items, cartFound);
                        Cart.findOneAndUpdate({ customerId: userId }, cartToUpdate, { new: true }, (errUpdate, cartUpdated) => {
                            if(errUpdate){
                                res.status(500).send(errUpdate);
                            }
                            res.status(200).json(cartUpdated);
                        });
                    }
                });
            }
        });
    }
}

updateItems = (items, cartToUpdate) => {
    try {
        cartToUpdate.amount = 0;
        cartToUpdate.items = [];
        items.forEach(item => {

            // ###### IS NOT WORKING WELL ######
            Product.findOne({ _id: item._id }, (errProduct, product) => {
                if (product){ // if product found
                    console.log(JSON.stringify(product))
                    item.name   = product.name;
                    item.price  = product.price;
                    //console.log(item)
                    console.log(cartToUpdate.items)
                    cartToUpdate.items.push(item);
                    cartToUpdate.amount += (item.price * item.qtd) - item.discount;
                    // item.product.price is not working
                }
            })
        })
        console.log(JSON.stringify(cartToUpdate))
        return cartToUpdate;
    } catch (err){
        console.log(err);
    }
}

exports.delete = (req, res) => {
    let id = req.params.id;
    Cart.findOneAndDelete({ _id: id }, (err, cartToDelete) => {
        if(err){
            res.status(500).send(err);
        } else {
            if (cartToDelete){
                res.status(200).send({"message" : "Carrinho excluído com sucesso"});
            } else {
                res.status(200).send({"message" : "Carrinho não encontrado"});
            }
        }
    });
}