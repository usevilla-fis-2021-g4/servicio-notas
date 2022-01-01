/*00const passport = require('passport');
const localAPIKey = require('passport-localapikey-update').Strategy

passport.use(new localAPIKey(
    (apikey,done)=>{
        Apikey.findOne({apikey:apikey},(err,user)=>{
            if(err) {
                return done(err);
            }
            if(!user){
                return done(null,false, {message: 'Unknown apikey' + apikey});
            }else{
                console.log("Logged as: " + user.user);
            }
        })
    }
))
*/