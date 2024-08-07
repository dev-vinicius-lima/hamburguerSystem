import express from 'express'
import routes from './routes.js'
import { dirname, resolve } from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

import './database/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
class App {
	constructor() {
		this.app = express()
		this.app.use(cors())
		this.middlewares()
		this.routes()
	}

	middlewares() {
		this.app.use(express.json())
		this.app.use(
			'/productFile',
			express.static(resolve(__dirname, '..', 'uploads')),
		)

		this.app.use(
			'/categoryFile',
			express.static(resolve(__dirname, '..', 'uploads')),
		)
	}

	routes() {
		this.app.use(routes)
	}
}

export default new App().app
