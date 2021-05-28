const bcrypt = require('bcrypt');
const { createUser, checkUser, isValidUser } = require('../helpers/DBHelper');
const { genId } = require('../helpers/helperFunctions')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 10;

const signUpController = async (req, res, next) => {
    const { name, password: PlainTextPassword, email} = req.body

    if(PlainTextPassword === '' || email === '' || name === ''){
        res.status(403).json('Please fill all your fields')
        return
    }
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        if(err) {
            res.json({
                error: err.message
            })
            return
        }
        bcrypt.hash(PlainTextPassword, salt, async (err, password) => {
            if(err) {
                res.status(500).json({
                    error: err.message
                })
                return
            }
            try{
                const user = await createUser({name, username: genId(), email, password})
                res.status(200).json({
                    message: "Registered Successfully",
                    user: {
                        username: user.username,
                        email: user.email,
                        name: user.name
                    }                
                })
            }
            catch(err){
                res.json({
                    err: err.message
                }).status(401)
            }
        });

    });
}

const signInController = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    try{
        const exists = await checkUser(email)
        if(exists){
            const {token,  user} = await isValidUser(email, password);
            res.status(200).json({
                auth: true,
                message: 'Successfully logged in',
                token,
                user
            })
        }
        else{
            res.json({
                auth: false,
                message: 'Invalid Credentials'
            })
        }
    }
    catch(err) {
        console.log(err);
    }
}

const getUserFromToken = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.decode(token, process.env.JWT_SECRET)
    res.json({
        user
    })
}

module.exports = {
    signUpController,
    signInController,
    getUserFromToken
}