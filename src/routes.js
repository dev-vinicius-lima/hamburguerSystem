import { Router } from 'express'
import UserController from './app/controllers/UserController.js'
import SessionController from './app/controllers/SessionController.js'
import ProductController from './app/controllers/ProductController.js'
const routes = Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)
routes.post('/products', ProductController.store)

export default routes
