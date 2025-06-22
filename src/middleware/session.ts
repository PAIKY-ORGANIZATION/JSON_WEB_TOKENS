


import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Unauthorized } from '../lib/exceptions.js';
import { prisma } from '../lib/db.js';

interface UserPayload {
    userId: string
}

export const sessionMiddleware = async(req: Request, res: Response, next: NextFunction)=>{
    
    const token = req.cookies['EXAMPLE_JWT_COOKIE']

    if(!token) {throw new  Unauthorized('No cookie found')}

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload



    const session = await prisma.user.findFirst({
        where: {
            id: decoded.userId
        }
    });

    if(!session) {throw new Unauthorized('No user found in database')}

    (req as any).user = session 

    next()
}