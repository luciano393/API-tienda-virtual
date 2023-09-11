import Models from '../helpers/db.js'

const { Order, User } = Models

export default {
    getAll,
    getById,
    create,
    update,
    _delete
}

async function getAll() {
    return await Order.find().populate('products')
}

async function getById(id) {
    return await Order.findById(id)
}

async function create(orderParams) {
    const order = new Order(orderParams)
    const savedOrder = await order.save()
    const user = await User.findById(order.userId)
    user.orders = user.orders.concat(savedOrder)
    await user.save() 
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
