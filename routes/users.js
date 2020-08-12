const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers');
const usersController = require('../controllers/users');

router.route('/signup')
    .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
    .post(usersController.signIn);

router.route('/secret')
    .get(usersController.secret);

module.exports = router