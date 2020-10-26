const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//const Product   = require('./product'); // require product model

mongoose.Promise = global.Promise;

const CartSchema = new Schema({
    customerId: String,
    amount:     Number,
    items:      [{
                _id:        { type: Schema.Types.ObjectId, ref: 'Product' },
                name:       String,
                price:      Number,
                qtd:        Number,
                discount:   Number
                }]
}, {
    collection: 'cartCollection'
});

module.exports = mongoose.model("cart", CartSchema);

/* object to use at api test
[
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