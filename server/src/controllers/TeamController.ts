import {Request, Response} from "express"
import User from "../models/User"

export class TeamMemberController {
    static findMemberByEmail = async(req: Request, res: Response) => {
        const {email} = req.body
        const user = await User.findOne({email}).select('id email name')
        if (!user) {
            const error = new Error('Usuario No Encontrado')
            return res.status(404).json({error: error.message})
        }
        res.json(user)
    }

    static addMemberById = async(req: Request, res: Response) => {
        const {id} = req.body

        const user = await User.findById(id).select('id')
        if (!user) {
            const error = new Error('Usuario No Encontrado')
            return res.status(404).json({error: error.message})
        }

        if (req.project.tema.some(team => team.toString() === user.id.toString())) {
            const error = new Error('El usuario ya existe en el proyecto')
            return res.status(409).json({error: error.message})
        }

        req.project.tema.push(user.id)
        await req.project.save()

        res.send('Usuario agregado correctamente')
    }
}