import * as Yup from 'yup'
import Product from '../models/Product.js'

class ProductController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category_id: Yup.number().required(),
		})

		try {
			await schema.validateSync(req.body, { abortEarly: false })
		} catch (error) {
			return res.status(400).json({ message: error.errors })
		}

		const { filename: path } = req.file
		const { name, price, category_id } = req.body

		const product = await Product.create({
			name,
			price,
			category_id,
			path,
		})

		return res.status(200).json({ product })
	}

	async index(req, res) {
		const products = await Product.findAll({
			include: { association: 'category', attributes: ['id', 'name'] },
		})
		return res.json(products)
	}
}

export default new ProductController()
