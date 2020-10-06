const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const Product   = require('./product') // require product model

mongoose.Promise = global.Promise;

const ItemsCart = new Array({
    // product:    { type: Schema.Types.ObjectId, ref: 'Product' },
    // verify what is wrong   -   is not work using Product inside CartSchema
    /*{
    "customerId": "Z",
    "amount":     10000,
    "items":    [{  
                    "name": "Produto C",
                    "price": 10000,
                    "qtd" : 2,
                    "discount": 0
                },
                {  
                    "name": "Produto A",
                    "price": 50000,
                    "qtd" : 3,
                    "discount": 1
                }]
    } */
    _id:         String, // alternatively, I had to use param outside of object
    name:       String, // alternatively, I had to use param outside of object
    price:      Number, // alternatively, I had to use param outside of object
    qtd:        Number,
    discount:   Number
});

module.exports = ItemsCart;