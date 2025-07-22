import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post('/create-account',
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('password').isLength({min:8}).withMessage('El password es muy corto, mínimo 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Los password no coinciden')
        }
        return true
    }),
    body('email').isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.createAccount)

export default router