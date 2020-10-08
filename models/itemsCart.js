const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const Product   = require('./product') // require product model

mongoose.Promise = global.Promise;

const ItemsCart = new Array({
    // product:    { type: Schema.Types.ObjectId, ref: 'Product' },
    // verify what is wrong   -   is not work using Product inside CartSchema
    /*[
        {  
            "_id": "5f628a23043b0c1dfc76cd51",
            "qtd" : 2,
            "discount": 1
        },
        {  
            "_id": "5f62a0948bafc4011ca3cd0d",
            "qtd" : 10,
            "discount": 0
        }
    ]*/
    id:         String, // alternatively, I had to use param outside of object
    name:       String, // alternatively, I had to use param outside of object
    price:      Number, // alternatively, I had to use param outside of object
    qtd:        Number,
    discount:   Number
});

module.exports = ItemsCart;