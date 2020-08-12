const User =  require('../models/users');

module.exports = {
    signUp: async (req, res, next) => { 

        const {email, password} = req.value.body;

        // check if email exists
        const foundUser =  User.findOne({email});
        if(foundUser){ return res.status(400).json({ error : 'Email is already in use'})};
        
        //create new user
        const newUser =  new User({ email, password});
        await newUser.save();

        //respond with token
        res.json({ user : 'User Created' });
    },

    signIn: async (req, res, next) => { 
        //generate token
    },

    secret: async (req, res, next) => { 
    }
}