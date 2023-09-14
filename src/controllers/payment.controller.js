import mercadopago from "mercadopago";
import { Router } from 'express'
import 'dotenv/config'
import orderService from '../services/order.js'


const { create } = orderService

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
        notification_url: "https://5e46-190-246-12-183.ngrok.io/api/payment/webhook"
    })
    create(result.body, user_id)
    res.send(result.body.init_point)
}

async function receiveWebhook(req, res){
    const payment = req.query

    try {
        if(payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment["data.id"])
            const {additional_info, date_approved, order, payer, payment_method, status_detail} = data.body
            console.log(additional_info.items, date_approved, order, payer, payment_method, status_detail)
        }
        
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ error: error.message })
    }
}