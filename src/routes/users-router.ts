import { Router } from "express";
import { validate } from "../middleware/validateBody.js";
import {  signupSchema } from "../zodSchemas/user-schema.js";
import { deleteSession, getSavedSession, signup, testCookie } from "../controllers/users/users.js";
import { sessionMiddleware } from "../middleware/session.js";
//*types:





export const router = Router();


router.post('/signup', validate(signup, signupSchema) )

router.get('/get-saved-session', validate(sessionMiddleware), validate(getSavedSession))

router.delete('/delete-session', validate(deleteSession))


router.get('/test-cookie', testCookie)
