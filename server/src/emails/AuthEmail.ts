import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user : IEmail) => {
        const info = await transporter.sendMail({
            from: 'Tarea <admin@gmail.com>',
            to: user.email,
            subject: 'Confirma tu cuenta',
            text: 'Confirma tu cuenta ahora mismo',
            html: `<p>Hola: ${user.name}, has creado tu cuenta, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONT_URL}/auth/confirm-account">Confirmar cuenta</a>    
                <p>E ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
            `
        })

        console.log('Mensaje enviado', info.messageId)
    }
}