import { Request, Response } from 'express';
import {  SignupSchemaType } from '../zodSchemas/user-schema.js';
import { BadRequest } from '../lib/exceptions.js';
import { prisma } from '../lib/db.js';
import { generateToken } from '../lib/generate-token.js';


export const signup = async (req: Request<{}, {}, SignupSchemaType>,res: Response) => {
	
	const { unique_username, favorite_food } = req.body

	const existingUser = await prisma.user.findUnique({
		where: {
			uniqueUsername: unique_username
		}
	})

	if (existingUser) throw new BadRequest('User already exists');

	const user = await prisma.user.create({
		data: {
			uniqueUsername: unique_username,
			favoriteFood: favorite_food
		}
	})

	const token = generateToken(user.id, res)

	console.log({token});
	
	res.send({ message: 'You have been provided a cookie with your JWT token. Session created!', data: {favorite_food}} );
};


export const deleteSession = async(req: Request, res: Response)=>{

	const existingCookie = req.cookies['EXAMPLE_JWT_COOKIE']
	if(!existingCookie) throw new BadRequest('No session found')

	res.clearCookie('EXAMPLE_JWT_COOKIE')
	res.send({message: 'Session deleted successfully!'})
}


export const getSavedSession = async(req: Request, res: Response)=>{
	const user = (req as any).user

	res.send({message: 'Successfully retrieved session!', session: user})
}


export const testCookie = async(_req: Request, res: Response)=>{
	
	 generateToken('lolol', res)

	 res.send('Cookie created')
}