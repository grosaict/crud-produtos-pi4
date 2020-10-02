const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    userName:   String,
    email:  String,
    pwd:    String
}, {
    collection: 'userCollection'
});

module.exports = mongoose.model("user", UserSchema);