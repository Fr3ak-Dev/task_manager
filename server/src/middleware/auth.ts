import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import User from "../models/User"

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
    if(!bearer) {
        const error = new Error('No Autorizado')
        return res.status(401).json({error: error.message})
    }

    const [, token] = bearer.split(' ') // Esto es para que el token sea el segundo elemento del array

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (typeof decoded === 'object' && decoded.id) {    // Verifica si el decoded es un objeto y tiene un id
            const user = await User.findById(decoded.id)
            console.log(user)
        }
    } catch (error) {
        res.status(500).json({error: 'Token No Válido'})
    }

    next()
}
