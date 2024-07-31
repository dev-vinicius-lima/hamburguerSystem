import User from '../models/User.js'
import * as Yup from 'yup'
class UserController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password_hash: Yup.string().required().min(6),
			admin: Yup.boolean(),
		})

		try {
			await schema.validateSync(req.body, { abortEarly: false })
		} catch (error) {
			return res.status(400).json({ message: error.errors })
		}

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
