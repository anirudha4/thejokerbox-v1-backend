//require Model form File MetaData
const FileMetaData = require('../models/FileMetaData');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const insertMetaData = async ({...metadata}) => {
    try{
        const data = await FileMetaData.create(metadata)
        return data;
    }
    catch(err){
        throw err;
    }
}

const createUser = async (data) => {
    try{
        const user = await User.create(data);
        return data
    }
    catch(err) {
        throw err
    }
}

const checkUser = async (email) => {
    try{
        const exists = await User.exists({ email })
        console.log(exists);
        return exists
    }
    catch(err) {
        console.log(err);
    }
}

const isValidUser = async (email, password) => {
    console.log(email, password);

    const user = await User.findOne({email})
    if(bcrypt.compare(password, user.password)){
        const token = jwt.sign({email, uid: user.uid, name: user.name}, process.env.JWT_SECRET)
        return {token, user: {email, username: user.username, id: user._id , name: user.name} };
    }
}


module.exports = {
    insertMetaData,
    createUser,
    checkUser,
    isValidUser
}