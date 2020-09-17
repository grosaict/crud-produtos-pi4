const User = require('../models/user')

exports.list = (req, res) => {
    User.find({},(err, user) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(user);
    });
}

exports.getById = (req, res) => {  
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if(err)
            res.status(500).send(err);        
        res.json(user);
    });
}

exports.insert = (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err, user) => {
        if(err) {
            res.send(err);
        }
        res.status(201).json(user);
    });
}
   
exports.update = (req, res) => {
    let id = req.params.id;
    let userToUpdate = req.body;
    User.findOneAndUpdate({ _id: id }, userToUpdate, { new: true }, (err, userUpdated) => {
        if(err){
            res.send(err);
        }
        res.json(userUpdated);
    });
}
   
exports.delete = (req, res) => {
    let id = req.params.id;
    User.findOneAndDelete({ _id: id }, (err, userToDelete) => {
        if(err){
            res.send(err);
        }
        res.json(userToDelete);
    });
}