import { Router } from 'express'
import { Auth, File, User } from '../controllers'

import multer from 'multer'
import multerConfig from '../configs/multer'
import authMiddleware from '../middlewares/auth'

const routes = Router()

routes.post('/user', User.create)

routes.post('/login', Auth.login)
routes.post('/reset_password', Auth.resetPassword)
routes.post('/forgot_password', Auth.forgotPassword)

routes.use(authMiddleware)

routes.get('/user', User.getAll)
routes.get('/user/me', User.getOne)
routes.get('/user/:id', User.getOne)
routes.put('/user/:id', multer(multerConfig).single('avatar'), User.update)
routes.delete('/user/:id', User.destroy)

routes.post('/file', multer(multerConfig).single('file'), File.create)
routes.delete('/file/:id', File.destroy)

export default routes
