import mercadopago from "mercadopago";
import { Router } from 'express'
import 'dotenv/config'
import orderService from '../services/order.js'
import paymentService from '../services/payment.js'


const { create_order, getPreference_id } = orderService
const { create_payment } = paymentService

const router = Router()

// routes
router.post('/create', createOrder);
router.get('/success', (req, res) => {
    console.log("exito")
    res.send("success")
});
router.get('/failure', (req, res) => {
    res.send("failure")
});
router.get('/pending', (req, res) => {
    res.send("pending")
});
router.post('/webhook', receiveWebhook);

export default router

async function createOrder(req, res){
    const {items, payer, shipments, user_id} = req.body
    mercadopago.configure({
        access_token: process.env.ACCESS_TOKEN_MP
    })
    const result = await mercadopago.preferences.create({
        items: items,
        payer: payer,
        shipments: shipments,
        back_urls: {
            success: "http://localhost:9000/api/payment/success",
            failure: "http://localhost:9000/api/payment/failure",
            pending: "http://localhost:9000/api/payment/pending",
        },
        notification_url: "https://c1de-190-246-12-183.ngrok.io/api/payment/webhook"
    })
    create_order(result.body, user_id)
        .then(() => console.log({message: "create order"}))
        .catch((e) => console.log({message: e}))
    res.send(result.body.init_point)
}

async function receiveWebhook(req, res){
    const payment = req.query
    try {
        if(payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment["data.id"])
            const data_order = await mercadopago.merchant_orders.findById(data.body.order.id)   
            const userId = await getPreference_id(data_order.body)
            create_payment(data.body, userId)
                .then(() => {                    
                    console.log({message: "create payment"})
                })
                .catch((e) => console.log({message: e}))
        }
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ error: error.message })
    }
}