import Models from '../helpers/db.js'
import {ObjectId} from 'mongodb'

const { Order, User } = Models

export default {
    getAll,
    getById,
    create,
    update,
    _delete
}

async function getAll() {
    return await Order.find()
}

async function getById(id) {
    return await Order.findById(id)
}

async function create(order_params, user_id) {
    const {items, payer, shipments} = order_params
    const order = await Order.create({
        items, payer, shipments, user_id
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
