
const passport = require('passport')
module.exports = {
    async failed(req,res){
        res.send('<h1>Log in Failed :(</h1>')
    },

    async loggedIn(req,res){
        res.send({result: req.isAuthenticated()})
    },

    passportAuthenticate(){
        passport.authenticate('google', { scope: ['profile', 'email'] })
    },
    
    logout(req,res){
        try{
            req.logout();
            res.redirect(process.env.HOME_URL)
        }
        catch(err){
            res.redirect(process.env.HOME_URL)
        }
    }


}