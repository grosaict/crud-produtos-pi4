const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const Product   = require('./product') // require product model

mongoose.Promise = global.Promise;

const ProductCart = new Array({
    // product:    { type: Schema.Types.ObjectId, ref: 'Product' },
    // verify what is wrong   -   is not work using Product inside CartSchema
    /*{
        "customerId": "aaaa",
        "amount":     10000,
        "items":    [{
                        "product" : {
                                    "name": "Produto C",
                                    "price": 10000
                                    },
                        "qtd" : 2,
                        "discount": 0
                    }]
    } */
    name:       String, // alternatively, use param outside object
    price:      Number, // alternatively, use param outside object
    qtd:        Number,
    discount:   Number
});

const CartSchema = new Schema({
    customerId: String,
    amount:     Number,
    items:      ProductCart
}, {
    collection: 'cartCollection'
});

module.exports = mongoose.model("cart", CartSchema);