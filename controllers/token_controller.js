const jwt = require('jsonwebtoken'); //import jsonwebtoken
const bcrypt = require('bcrypt'); //import bcrypt
const saltRounds = 12; //define a secure hash (rounds=12: 2-3 hashes/sec)

const User = require('../models/user')

exports.insertUser = (req, res) => {
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

exports.tokenGenerator = (req, res, next) => {
    if (req.body && req.body.userName && req.body.pwd){
        const userName  = req.body.userName
        const pwd       = req.body.pwd
        User.findOne({userName: userName}, (err, user) => {
            if(err){
                res.status(500).send(err);
            }
            if(!user){
                res.status(401).send("Usuario ou senha inválidos");
            }else{
                const checked = bcrypt.compareSync(pwd, user.pwd);
                if(checked){
                    const token = jwt.sign({
                        id: user.id
                    }, 'Sen@cr5', {expiresIn: 60}); // Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
                    res.status(201).send({"token":token});
                }
                else {
                    res.status(401).send("Usuario ou senha inválidos");
                }
            }
        });
    }
    else{
        res.status(400).send("Usuario ou senha não informados");
    }
}

exports.tokenCheck = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token) {
        res.status(401).send("Token de acesso inexistente");
    }
    else {
        jwt.verify(token,'Sen@cr5',(err, userId) =>{
            if(err){
                res.status(401).send("Token de acesso inválido ou expirado");
            }
            else {
                //console.log("Usuário autorizado: " + JSON.stringify(userId));
                next();
            }
        })
    }
}