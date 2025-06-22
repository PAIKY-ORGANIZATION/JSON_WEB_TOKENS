import { z } from 'zod'


export const signupSchema = z.object({
    body: z.object({
        unique_username: z.string({required_error: 'unique_username is required'}).min(1).nonempty(),
        favorite_food: z.string({required_error: 'favorite_food is required'}).min(1).nonempty(),
    })
})


export type SignupSchemaType = z.infer<typeof signupSchema>['body']
