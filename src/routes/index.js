import { Router } from 'express'
import { auth, file, user } from '../controllers'

import multer from 'multer'
import multerConfig from '../configs/multer'
import authMiddleware from '../middlewares/auth'

const routes = Router()

routes.post('/user', user.create)

routes.post('/login', auth.login)
routes.post('/reset_password', auth.resetPassword)
routes.post('/forgot_password', auth.forgotPassword)

routes.use(authMiddleware)

routes.get('/user', user.getAll)
routes.get('/user/me', user.getOne)
routes.get('/user/:id', user.getOne)
routes.put('/user/:id', multer(multerConfig).single('avatar'), user.update)
routes.delete('/user/:id', user.destroy)

routes.post('/file', multer(multerConfig).single('file'), file.create)
routes.delete('/file/:id', file.destroy)

export default routes
