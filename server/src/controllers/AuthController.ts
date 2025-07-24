import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { transporter } from "../config/nodemailer";

export class AuthController {
    static createAccount = async(req: Request, res: Response) => {
        try {
            const {password, email} = req.body

            // Prevenir duplicados
            const userExists = await User.findOne({email})
            if (userExists) {
                const error = new Error('El usuario ya esta registrado')
                return res.status(409).json({error: error.message})
            }
            
            const user = new User(req.body)

            user.password = await hashPassword(password)

            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            // enviar email
            await transporter.sendMail({
                from: 'Tarea <admin@gmail.com>',
                to: user.email,
                subject: 'Confirma tu cuenta',
                text: 'Confirma tu cuenta ahora mismo',
                html: `<p>Probando...</p>`
            })

            await Promise.allSettled([user.save(), token.save()])
            
            res.send('Cuenta creada, revisa tu email para confirmarla')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}