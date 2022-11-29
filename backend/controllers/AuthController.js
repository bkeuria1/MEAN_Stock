
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt')
module.exports = {
    async failed(req,res){
        res.send('<h1>Log in Failed :(</h1>')
    },

    async loggedIn(req,res){
        res.send({result: req.isAuthenticated()})
    },

    logout(req,res){
        try{
            req.logout();
            res.redirect(process.env.HOME_URL)
        }
        catch(err){
            res.redirect(process.env.HOME_URL)
        }
    },
    async register(req,res){
        const {email,password,confirmPassword} = req.body
        if(confirmPassword !== password){
            return res.status(500).send("Passwords do not match")
        }
        const user = await User.findOne({email:email})
        if(user){
            return res.status(500).send({"message":"An account with this email already exists"})
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            try{
                await User.create({
                    email: email,
                    password: hashedPassword

                })
                passport.authenticate('local')(req, res, function () {
                    res.status(201).send({'user':'user'});
                });
                
            }catch(err){
                console.log(err)
            }
        
        }
    },

}