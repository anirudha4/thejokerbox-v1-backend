const router = require('express').Router();

// require controller
const { signUpController, signInController,  getUserFromToken } = require('../../../controllers/AuthController');

router.post('/signup', signUpController);

router.post('/signin', signInController)

router.get('/getuserbytoken', getUserFromToken)

module.exports = router;