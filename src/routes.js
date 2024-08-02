import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer.cjs'
import UserController from './app/controllers/UserController.js'
import SessionController from './app/controllers/SessionController.js'
import ProductController from './app/controllers/ProductController.js'
import CategoryController from './app/controllers/CategoryController.js'
import authMiddleware from './app/middlewares/auth.js'
import OrderController from './app/controllers/OrderController.js'
const routes = Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

export default routes
