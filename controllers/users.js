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
     
        const token = signToken(req.user);
       
        //respond with token
        res.status(200).json({ success : true, token : 'jwt ' + token });
    },

    secret: async (req, res) => { 
        const user = await User.findOne({ email : req.user.email }); 
        console.log(user);
        res.status(200).json({ success : true, message : user._id , userName : user.email });
        //userId : user._id, userName : user.email , userPass : user.password   
    }
}