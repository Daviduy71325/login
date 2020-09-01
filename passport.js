const passport =  require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy =  require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const User =  require('./models/users');
const { JWT_SECRET } = require('./configuration/index');

const opt =  {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey : JWT_SECRET   
}

module.exports = (passport) =>{
    passport.use(new JwtStrategy(opt, async (payload, done) => {
        console.log(payload.sub); 
        const user = await User.findById( payload.sub)
        
         //if users does not exist, handle it
        if(!user) { return done(null, false);}

        //otherwise, return the user
        return done(null, user);
         
     }));
}

/// local strategy

passport.use(new LocalStrategy({
    usernameField : 'email',
    }, async (email, password, done) => {
   
        const user =  await User.findOne({ email : email });

        if(!user){
            return done(null, false);
        }
    
        const isMatch = await user.isValidPassword(password);
        if(!isMatch){
            return done(null, false);
        }
    
        done(null, user);
  

}));