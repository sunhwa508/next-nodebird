const passport = require('passport');
const { User } = require('../models');
const local = require('./local');

module.exports = () => {
    //메모리 사용을 아끼기위해 
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done)=>{
        try{
            const user =  await User.findOne({where: {id}})
            done(null, user);
        }catch(error){
            console.error(error);
            done(error)
        }

    });
    
    local();

}