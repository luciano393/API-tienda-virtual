import Models from '../helpers/db.js'

const { Role } = Models

export default {
    getAll,
    getById,
    create,
    update,
    _delete
}

async function getAll() {
    return await Role.find()
}

async function getById(id) {
    return await Role.findById(id)
}

async function create(roleParam) {
    const data = await Role.findOne({ name: roleParam.name })
    if(data) {
        return console.log('Role "' + roleParam.name + '" is already taken')
    } else {
        const role = new Role(roleParam)
        await role.save()
        return role
    }
}

async function update(id, roleParam) {
    const role = await Role.findById(id);

    if(!role) throw 'Role not found'

    Object.assign(role, roleParam)
    await role.save()
}

async function _delete(id) {
    await Role.findByIdAndRemove(id)
        .then(res => console.log(res))
        .catch(error => console.log(error))
}


