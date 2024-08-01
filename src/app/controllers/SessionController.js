import * as Yup from 'yup'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.js'

class SessionController {
	async store(req, res) {
		const schema = Yup.object().shape({
			email: Yup.string().email().required(),
			password: Yup.string().required(),
		})

		try {
			await schema.validate(req.body)
		} catch (error) {
			return res
				.status(400)
				.json({ message: 'Login failed sure email or password are incorrect' })
		}

		const { email, password } = req.body

		const user = await User.findOne({ where: { email } })

		if (!user) {
			return res
				.status(404)
				.json({ message: 'Login failed sure email or password are incorrect' })
		}

		const passwordMatch = await user.checkPassword(password)

		if (!passwordMatch) {
			return res
				.status(401)
				.json({ message: 'Login failed sure email or password are incorrect' })
		}

		return res.json({
			id: user.id,
			email,
			name: user.name,
			admin: user.admin,
			token: jwt.sign({ id: user.id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		})
	}
}

export default new SessionController()
