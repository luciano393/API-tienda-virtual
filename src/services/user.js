import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Models from '../helpers/db.js';
import 'dotenv/config'

const secret = process.env.SECRET
const { compareSync, hashSync } = bcrypt;
const { sign } = jwt
const { User, Role } = Models

export default {
    authenticate,
    getAll,
    getById,
    create,
    update,
    _delete
}

async function authenticate({email, password}){
    const user = await User.findOne({ email });
    if(user && compareSync(password, user.hash)) {
        const token = sign({sub: user.id}, secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        }
    }
}

async function getAll() {
    return await User.find({}).populate('roleId')
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
        const role = await Role.findById(userParam.roleId)
        if(userParam.password) {
            user.hash = hashSync(userParam.password, 10);
        }  
        const token = sign({sub: user.id}, process.env.SECRET, { expiresIn: '7d' });
        const savedUser = await user.save();
        role.users = role.users.concat(savedUser._id)
        await role.save()
        return user, token
    }
    
}


async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
