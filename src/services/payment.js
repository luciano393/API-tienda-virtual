import Models from '../helpers/db.js'

const { Payment} = Models

export default {
    getAll,
    getById,
    create,
    update,
    _delete
}

async function getAll() {
    return await Payment.find()
}

async function getById(id) {
    return await Payment.findById(id)
}

async function create(paymentParams) {
    const payment = new Payment(paymentParams)
    return await payment.save()
}

async function update(id, paymentParam) {
    const payment = await Payment.findById(id);

    if(!payment) throw 'Order not found'

    Object.assign(payment, paymentParam)
    await paymentr.save()
}

async function _delete(id) {
    await Payment.findByIdAndRemove(id)
        .then(res => console.log(res))
        .catch(error => console.log(error))
}
