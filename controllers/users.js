const JWT = require('jsonwebtoken');
const User =  require('../models/users');

signToken =  user => {
    return JWT.sign({
        iss: 'DavidUy',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getTime() + 1)
    },  process.env.JWT_SECRET);

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
        res.status(200).json({ token });

    },

    signIn: async (req, res, next) => { 
        //generate token
    },

    secret: async (req, res, next) => { 
    }
}