import { Router } from 'express'
import User from './app/models/User.js'
const routes = Router()

routes.get('/', async (req, res) => {
	try {
		const user = await User.create({
			name: 'vinicius adm',
			email: 'viniadm@example.com',
			password_hash: '123456',
			admin: true,
		})
		return res.json(user)
	} catch (error) {
		console.log(`Error: ${error}`)
	}
})

export default routes
