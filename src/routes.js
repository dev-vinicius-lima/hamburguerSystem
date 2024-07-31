import { Router } from 'express'
import UserController from './app/controllers/UserController.js'
import SessionController from './app/controllers/SessionController.js'
const routes = Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

export default routes
