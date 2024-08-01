import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer.cjs'
import UserController from './app/controllers/UserController.js'
import SessionController from './app/controllers/SessionController.js'
import ProductController from './app/controllers/ProductController.js'
const routes = Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

export default routes
