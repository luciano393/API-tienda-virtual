const config = require('../config/config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    _delete
}

async function authenticate({email, password}){
    const user = await User.findOne({ email });
    if(user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({sub: user.id}, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        }
    }
}

async function getAll() {
    return await User.find()
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    const data = await User.findOne({email: userParam.email})
    if(data) {
        return console.log('Email "' + userParam.email + '" is already taken')
    } else {
        const user = new User(userParam);

        if(userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
        const token = jwt.sign({sub: user.id}, config.secret, { expiresIn: '7d' });
        await user.save();
        return user, token
    }
    
}


async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
