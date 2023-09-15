import Models from '../helpers/db.js'

const { Payment, User} = Models

export default {
    getAll,
    getById,
    create_payment,
    update,
    _delete
}

async function getAll() {
    return await Payment.find()
}

async function getById(id) {
    return await Payment.findById(id)
}

async function create_payment(paymentParams, userId) {
    const {additional_info,currency_id,date_approved,order,payment_type_id,status_detail,transaction_details} = paymentParams
    const {ip_address, items,payer} = additional_info
    const user_id = userId
    const payment = await Payment.create({
        user_id,
        ip_address,
        items,
        payer,
        currency_id,
        date_approved,
        order,
        payment_type_id,
        status_detail,
        transaction_details
    })
    const user = await User.findById(userId)
    user.payments = user.payments.concat(payment._id)
    await user.save()
    return payment
}

async function update(id, paymentParam) {
    const payment = await Payment.findById(id);

    if(!payment) throw 'Payment not found'

    Object.assign(payment, paymentParam)
    await paymentr.save()
}

async function _delete(id) {
    await Payment.findByIdAndRemove(id)
        .then(res => console.log(res))
        .catch(error => console.log(error))
}
