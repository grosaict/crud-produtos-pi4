const jwt = require('jsonwebtoken'); //import jsonwebtoken
const bcrypt = require('bcrypt'); //import bcrypt
const saltRounds = 12; //define a secure hash (rounds=12: 2-3 hashes/sec)

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

exports.getByUserName = (req, res, next) => {
    if (req.query && req.query.userName){
        const paramUserName = req.query.userName;
        User.find({userName: paramUserName}, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(users);
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
            res.send(err);
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

exports.userCheck = (req, res, next) => {
    if (req.body && req.body.userName && req.body.pwd){
        const userName = req.body.userName;
        const pwd = req.body.pwd
        User.findOne({userName: userName}, (err, user) => {
            if(err){
                res.status(500).send(err);
            }
            if(user){
                const checked = bcrypt.compareSync(pwd, user.pwd);
                if(checked){
                    const token = jwt.sign({
                        id: user.id
                    }, 'Sen@cr5', {expiresIn: "1h"});
                    res.status(201).send({"token":token});
                }
                else {
                    res.status(401).send("Usuario ou senha inválidos");
                }
            }else {
                res.status(401).send("Usuario ou senha inválidos");
            }
        });
    }
}

exports.tokenCheck = (req, res, next) => {
    const token = req.get("x-auth-token");
    console.log(token)
    if(!token) {
        res.status(401).send("Não tem token de acesso");
    }
    else {
        jwt.verify(token,'Sen@cr5',(err,userId) =>{
            if(err){
                res.status(401).send(err);
            }
            else {
                console.log("Usuário autorizado: "+userId);
                next();
            }
        })
    }
}