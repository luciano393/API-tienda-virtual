import Models from '../helpers/db.js'

const { Lead, User } = Models

export default {
    getAll,
    getById,
    create,
    update,
    _delete
}

async function getAll() {
    return await Lead.find().populate('userId')
}

async function getById(id) {
    return await Lead.findById(id)
}

async function create(leadParams) {
    const lead = new Lead(leadParams)
    const savedLead = await lead.save()
    const user = await User.findById(lead.userId)
    user.leads = savedLead._id
    await user.save() 
}

async function update(id, leadParam) {
    const lead = await Lead.findById(id);

    if(!lead) throw 'Lead not found'

    Object.assign(lead, leadParam)
    await lead.save()
}

async function _delete(id) {
    await Lead.findByIdAndRemove(id)
        .then(res => console.log(res))
        .catch(error => console.log(error))
}
