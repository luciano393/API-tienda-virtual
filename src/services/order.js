import Models from '../helpers/db.js'

const { Order, User } = Models

export default {
    getAll,
    getById,
    create_order,
    update,
    _delete,
    getPreference_id
}

async function getAll() {
    return await Order.find()
}

async function getPreference_id(param) {
    const order = await Order.findOne({preference_id: param.preference_id})
    return order.user_id
}

async function getById(id) {
    return await Order.findById(id)
}

async function create_order(order_params, user_id) {
    const {items, payer, shipments, id} = order_params
    const preference_id = id
    const order = await Order.create({
        items, payer, shipments, user_id, preference_id
    })
    const user = await User.findById(order.user_id)
    user.orders = user.orders.concat(order)
    await user.save() 
    return order
}

async function update(id, orderParam) {
    const order = await Order.findById(id);

    if(!order) throw 'Order not found'

    Object.assign(order, orderParam)
    await order.save()
}

async function _delete(id) {
    await Order.findByIdAndRemove(id)
        .then(res => console.log(res))
        .catch(error => console.log(error))
}
