import express from 'express'
import nodemailer from 'nodemailer'
import config from '../config/config.js'

const router = express.Router();

router.post('/send', sendEmail);

export default router;

async function sendEmail(req, res, next) {
    const body = req.body
    let email = {
        from: `Sitio Web ${config.nodemailerConfig.auth.user}`,
        to: "lucianoib393@gmail.com",
        subject: "Nuevo mensaje de mi sitio web",
        text: `Nombre: ${body.name} - Email: ${body.email} - Descripcion del mensaje: ${body.description}`
    }
    const Transport = nodemailer.createTransport(config.nodemailerConfig);

    await Transport.sendMail(email,(error,info)=>{error ? console.log(error) : console.log("Correo enviado correctamente.")});
    res.status(200).json({ ok: true, message: "Mensaje enviado con éxito!"})
    Transport.close()
}