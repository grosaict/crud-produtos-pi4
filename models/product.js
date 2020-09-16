
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const ProductSchema = new Schema({
    name: String,
    price: Number
}, { versionKey: false
}, { collection: 'productCollection'
});

module.exports = mongoose.model("Product", ProductSchema);