import User from '../models/User.js'

class UserController {
	async store(req, res) {
		const { name, email, password_hash, admin } = req.body
		try {
			const user = await User.create({ name, email, password_hash, admin })
			return res.status(201).json({
				message: 'User created',
				id: user.id,
				name,
				email,
				admin,
			})
		} catch (error) {
			return res.status(400).json({ message: 'User already exists' })
		}
	}
}

export default new UserController()
