import { Response } from 'express'
import jwt from 'jsonwebtoken'

export const generateToken = (userId: string, res: Response) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: '7d'})

    res.cookie('EXAMPLE_JWT_COOKIE', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // httpOnly: true,
        // sameSite: 'strict',
    })

    return token

}