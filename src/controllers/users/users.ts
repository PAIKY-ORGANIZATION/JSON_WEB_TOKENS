import { Request, Response } from 'express';
import { LoginSchemaType, SignupSchemaType } from '../../zodSchemas/user-schema.js';
import { BadRequest } from '../../lib/exceptions.js';
import { prisma } from '../../lib/db.js';
import { generateToken } from '../../lib/generate-token.js';


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
	
	res.send({ message: 'You have been provided a cookie with your JWT token. Session created!', favorite_food} );
};

export const signin = async (req: Request<{}, {}, LoginSchemaType>, res: Response) => {
    
	const {unique_username} = req.body

	res.send({ message: 'Success', data: {  } });
};


export const getSavedSession = async(req: Request, res: Response)=>{
	const user = (req as any).user

	res.send({message: 'Successfully retrieved session!', session: user})
}



export const triggerBadRequest = async (_req: Request, _res: Response) => {
	
    throw new BadRequest('Bad request');

};
