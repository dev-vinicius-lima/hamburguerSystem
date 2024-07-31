import * as Yup from 'yup'

class ProductController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category: Yup.string().required(),
		})
		try {
			await schema.validateSync(req.body, { abortEarly: false })
		} catch (error) {
			return res.status(400).json({ message: error.errors })
		}

		return res.status(200).json({ message: 'Product created' })
	}
}

export default new ProductController()
