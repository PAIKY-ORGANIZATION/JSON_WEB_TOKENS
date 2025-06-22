import { Response } from 'express'
import jwt from 'jsonwebtoken'

export const generateToken = (userId: string, res: Response) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: '7d'})
}