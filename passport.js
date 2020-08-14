const passport =  require('passport');
const JwtStrategy =  require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const User =  require('./models/users');
const JWT_SECRET = require('./configuration');

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
//opts.secretOrKey = process.env.JWT_SECRET;
opts.secretOrKey = JWT_SECRET;
debugger;
const strategy = new JwtStrategy(opts, (payload, done) => {
    console.log(payload.sub);
    User.findOne({_id: payload.sub}, (err, user) => {

        if (err) {
            return done(err, false);
        }

        if (!user) {
            return done(null, false);
        }

        return done(null, user);

    });

});

module.exports = (passport) =>{
    passport.use(strategy);
}
// passport.use(new JwtStrategy({
//     jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'), 
//     secretOrKey : process.env.JWT_SECRET
// }, async (payload, done) =>{
//     try
//     {
//         //find the user specified in the token
//         const user  = await User.findById(payload.sub);

//          //if users does not exist, handle it
//         if(!user) { return done(null, false);}

//         //otherwise, return the user
//         done(null, user);
//     }
//     catch(error)
//     {
//         done(error, false);
//     }
// }));