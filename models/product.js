const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const ProductSchema = new Schema({
    _id:    Schema.Types.ObjectId,
    name:   String,
    price:  Number
}, {
    //O que faz essa linha?    <<<<<<<<<<<<<<<<<<
    //versionKey: false
    //Só funcionou depois que substitui pela linha abaixo
    collection: 'productCollection'
});

module.exports = mongoose.model("product", ProductSchema);