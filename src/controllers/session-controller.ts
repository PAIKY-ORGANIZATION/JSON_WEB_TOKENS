import { Request, Response } from 'express';
import {  SignupSchemaType } from '../zodSchemas/user-schema.js';
import { BadRequest } from '../lib/exceptions.js';
import { prisma } from '../lib/db.js';
import { generateToken } from '../lib/generate-token.js';


export const signup = async (req: Request<{}, {}, SignupSchemaType>,res: Response) => {
	
	const { unique_username, favorite_food } = req.body

	//* Check if user already exists, if so, throw error
	const existingUser = await prisma.user.findUnique({
		where: {
			uniqueUsername: unique_username
		}
	})

	if (existingUser) throw new BadRequest('User already exists');


	//* Create user in database
	const user = await prisma.user.create({
		data: {
			uniqueUsername: unique_username,
			favoriteFood: favorite_food
		}
	})

	//* Generate JWT token and append as cookie to the response object (`res`)
	generateToken(user.id, res)
	

	res.send({ message: 'You have been provided a cookie with your JWT token. Session created!', data: {favorite_food}} );
};



export const getSavedSession = async(req: Request, res: Response)=>{
	//* This controller has gone through the middleware `sessionMiddleware`.
	//* Only if the middleware has passed, `req.user` will be available.
	//* Otherwise, the middleware will throw an error and this controller WILL NOT BE REACHED.

	const user = (req as any).user

	res.send({message: 'Successfully retrieved session!', session: user})
}


export const deleteSession = async(req: Request, res: Response)=>{
	//* Here we clean the cookie out of the user's http agent (for example: browser, postman, etc.)


	const existingCookie = req.cookies['EXAMPLE_JWT_COOKIE']
	if(!existingCookie) throw new BadRequest('No session found')

	res.clearCookie('EXAMPLE_JWT_COOKIE')	
	res.send({message: 'Session deleted successfully!'})
}	
