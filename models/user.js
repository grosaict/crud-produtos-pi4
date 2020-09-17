var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    name:   String,
    email:  String,
    pwd:    String
}, {
    collection: 'userCollection'
});

module.exports = mongoose.model("userSchema", UserSchema);