const bcrypt = require('bcrypt'); //import bcrypt
const saltRounds = 12; //define a secure hash (rounds=12: 2-3 hashes/sec)

const User = require('../models/user')

exports.list = (req, res) => {
    User.find({},(err, user) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).json(user);
    });
}

exports.getById = (req, res) => {  
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if(err){
            err.teamMsg = "Usuário não encontrado";
            res.status(500).send(err);
        }
        res.status(200).json(user);
    });
}

exports.getByUserName = (req, res, next) => {
    if (req.query && req.query.userName){
        const paramUserName = req.query.userName;
        User.find({userName: paramUserName}, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    }
}

exports.insert = (req, res) => {
    let newUser = new User(req.body);
    if (newUser.pwd) {
        //encrypting password
        newUser.pwd = bcrypt.hashSync(newUser.pwd, saltRounds);
    }    
    newUser.save((err, user) => {
        if(err) {
            res.status(500).send(err);
        }
        res.status(201).json(user);
    });
}
   
exports.update = (req, res) => {
    let id = req.params.id;
    let userToUpdate = req.body;
    console.log(userToUpdate.pwd);
    if (userToUpdate.pwd) {
        //encrypting password
        userToUpdate.pwd = bcrypt.hashSync(userToUpdate.pwd, saltRounds);
    }
    console.log(userToUpdate.pwd);
    User.findOneAndUpdate({ _id: id }, userToUpdate, { new: true }, (err, userUpdated) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).json(userUpdated);
    });
}
   
exports.delete = (req, res) => {
    let id = req.params.id;
    User.findOneAndDelete({ _id: id }, (err, userToDelete) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).json(userToDelete);
    });
}