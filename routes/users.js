const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
//require('../passport');
require('../passport')(passport);
const { validateBody, schemas } = require('../helpers/routeHelpers');
const usersController = require('../controllers/users');

router.route('/signup')
    .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
    .post(usersController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt', { session : false }), function (req, res){
        debugger;
        res.json({msg: 'asdf'});
    });

module.exports = router