const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    _id:        Schema.Types.ObjectId,
    userName:   String,
    email:      String,
    pwd:        String
}, {
    collection: 'userCollection'
});

module.exports = mongoose.model("user", UserSchema);