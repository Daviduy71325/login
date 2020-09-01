const JWT = require('jsonwebtoken');
const User =  require('../models/users');
const { JWT_SECRET } = require('../configuration');

signToken =  newUser => {
    return JWT.sign({
        // iss: 'DavidUy',
        sub: newUser.id,
        iat: new Date().getTime(),
        expiresIn: new Date().setDate(new Date().getTime() + 1)
    }, JWT_SECRET);

}

module.exports = {
    signUp: async (req, res, next) => { 

        const {email, password} = req.value.body;

        // check if email exists
        const foundUser = await User.findOne({ email: email});
        if(foundUser){ return res.status(400).json({ error : 'Email is already in use'})};
        
        //create new user
        const newUser =  new User({ email, password});
        await newUser.save();

        //generate the token
        const token = signToken(newUser);
       
        //respond with token
        res.status(200).json({ success : true,token : 'jwt ' + token});

    },

    signIn: async (req, res, next) => { 
        //generate token
        console.log('logged in');
        const {email, password} = req.value.body;

        // check if email exists
        const foundUser = await User.findOne({ email: email});
    
        //generate the token
        const token = signToken(foundUser);
       
        //respond with token
        res.status(200).json({ success : true, token : 'jwt ' + token });
    },

    secret: async (req, res, next) => { 
        const email = res.email;
        const foundUser = await User.findOne({ email: email});
        console.log(foundUser.id);
        console.log('i managed to get here' + email);
        
    }
}