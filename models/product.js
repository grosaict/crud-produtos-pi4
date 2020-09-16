
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const ProductSchema = new Schema({
    name: String,
    price: Number
}, {
    //O que faz essa linha?
    //versionKey: false
    //Só funcionou depois que substitui pela linha abaixo
    collection: 'productCollection'
});

module.exports = mongoose.model("productSchema", ProductSchema);