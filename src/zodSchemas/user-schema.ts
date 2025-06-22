import { z } from 'zod'


export const signupSchema = z.object({
    body: z.object({
        uniqueUsername: z.string({required_error: 'uniqueUsername is required'}).min(1).nonempty(),
    })
})

export const loginSchema = z.object({
    body: z.object({
        uniqueUsername: z.string({required_error: 'uniqueUsername is required'}).min(1).nonempty(),
    })
});

export type SignupSchemaType = z.infer<typeof signupSchema>['body']
export type LoginSchemaType = z.infer<typeof loginSchema>['body']