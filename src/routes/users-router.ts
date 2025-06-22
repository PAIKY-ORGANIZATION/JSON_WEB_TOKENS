import { Router } from "express";
import { validate } from "../middleware/validateBody.js";
import { loginSchema, signupSchema } from "../zodSchemas/user-schema.js";
import { getSavedSession, signin, signup, triggerBadRequest } from "../controllers/users/users.js";
import { sessionMiddleware } from "../middleware/session.js";
//*types:





export const router = Router();


router.post('/signup', validate(signup, signupSchema) )

router.get('/get-saved-session', validate(sessionMiddleware), validate(getSavedSession))


router.post('/signin', validate(signin, loginSchema))

router.post('/logout', triggerBadRequest)

