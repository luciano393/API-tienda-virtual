import mercadopago from "mercadopago";
import { Router } from 'express'

const router = Router()

// routes
router.post('/create', createOrder);
router.get('/success', (req, res) => res.send("success"));
router.get('/failure', (req, res) => res.send("failure"));
router.get('/pending', (req, res) => res.send("pending"));
router.post('/webhook', receiveWebhook);

export default router

const createOrder = async (req, res) =>  {
    mercadopago.configure({
        access_token: ""
    })
    const result = mercadopago.preferences.create({
        items: [
            {
                title: "Laptop",
                unit_price: 500,
                currency_id: "ARG",
                quantity: 1
            }
        ],
        back_urls: {
            success: "http://localhost:9000/api/payment/success",
            failure: "http://localhost:9000/api/payment/failure",
            pending: "http://localhost:9000/api/payment/pending",
        },
        notification_url: "https://d0bf-190-246-12-183.ngrok.io/api/payment/webhook"
    })
    console.log(result)
    res.send(result.body)
}

const receiveWebhook = async (req, res) => {
    console.log(req.query)
    const payment = req.query

    try {
        if(payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment["data.id"])
            console.log(data)
        }
        
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ error: error.message })
    }
}