import { z } from 'zod'


export const signupSchema = z.object({
    body: z.object({
        unique_username: z.string({required_error: 'unique_username is required'}).min(1).nonempty(),
    })
})

export const loginSchema = z.object({
    body: z.object({
        unique_username: z.string({required_error: 'unique_username is required'}).min(1).nonempty(),
    })
});


export type SignupSchemaType = z.infer<typeof signupSchema>['body']
export type LoginSchemaType = z.infer<typeof loginSchema>['body']