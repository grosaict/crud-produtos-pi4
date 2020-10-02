const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('./product') // require product model

mongoose.Promise = global.Promise;

const ProductCart = new Array({
    product:    Product,
    qtd:        Number,
    discount:   Number
});

const CartSchema = new Schema({
    items:      ProductCart,
    amount:     Number
}, {
    collection: 'cartCollection'
});

module.exports = mongoose.model("cart", CartSchema);