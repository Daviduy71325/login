const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
//require('../passport');
require('../passport')(passport);
const { validateBody, schemas } = require('../helpers/routeHelpers');
const usersController = require('../controllers/users');
const passportSignIn =  passport.authenticate('local', { session : false });
const passportJWT = passport.authenticate('jwt', { session : false });
router.route('/signup')
    .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema),passportSignIn,usersController.signIn);

router.route('/secret')
    .post(passportJWT, usersController.secret);

module.exports = router;