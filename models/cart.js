const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const ItemsCart   = require('./itemsCart') // require product model

mongoose.Promise = global.Promise;

const CartSchema = new Schema({
    customerId: String,
    amount:     Number,
    items:      ItemsCart
}, {
    collection: 'cartCollection'
});

module.exports = mongoose.model("cart", CartSchema);