const Cart      = require('../models/cart')
//const ItemsCart = require('../models/itemsCart')
const User      = require('../models/user')
const Product   = require('../models/product')

exports.list = (req, res) => {
    Cart.find({},(err, Cart) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).json(Cart);
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
        User.findById({ _id: userId }, (errUser, user) => {
            if(errUser){
                errUser.teamMsg = "Usuário não encontrado";
                res.status(500).send(errUser);
            } else {
                Cart.findOne({customerId: userId}, async (errFound, cartFound) => {
                    if(errFound) {
                        res.status(500).send(errFound);
                    }
                    if (!cartFound) { // If not exist, insert a new one
                        let newCart = new Cart();
                        newCart.customerId = userId
                        console.log(newCart)
                        newCart = await updateItems(items, newCart)
                        //console.log(newCart)
                        newCart.save((errSave, savedCart) => {
                            if(errSave) {
                                console.log(errSave)
                                res.status(500).send(errSave);
                            }
                            //console.log(JSON.stringify(newCart))
                            res.status(201).json(savedCart);
                        });
                    }else{
                        let cartToUpdate = new Cart();
                        cartToUpdate = await updateItems(items, cartFound);
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

updateItems = async (items, cart) => {
    try {
        cart.amount = 0;
        cart.items = [];
        for(const item of items) {
            //Product.findById({ _id: item._id }).populate('product')
            let product = await Product.findById({ _id: item._id });
            if (product){ // if product found
                item.name   = product.name;
                item.price  = product.price;
                cart.items.push(item);
                cart.amount += (item.price - item.discount) * item.qtd;
                // item.product.price is not working
            }
        }
        //console.log(JSON.stringify(cart))
        return cart;
    } catch (err){
        console.log(err);
    }
};

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