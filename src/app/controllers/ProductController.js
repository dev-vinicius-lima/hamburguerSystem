import * as Yup from 'yup'
import Product from '../models/Product.js'
import User from '../models/User.js'

class ProductController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category_id: Yup.number().required(),
			offer: Yup.boolean().optional(),
		})

		try {
			await schema.validateSync(req.body, { abortEarly: false })
		} catch (error) {
			return res.status(400).json({ message: error.errors })
		}

		const { admin: isAdmin } = await User.findByPk(req.userId)
		if (!isAdmin) {
			return res.status(401).json()
		}

		if (!req.file) {
			return res.status(400).json({ message: 'File not found please upload' })
		}
		const { filename: path } = req.file
		if (!path) {
			return res.status(400).json({ message: 'File not found' })
		}
		const { name, price, category_id, offer } = req.body
		const isAllFieldsFilled = Boolean(name && price && category_id)
		if (!isAllFieldsFilled) {
			return res.status(400).json({ message: 'All fields are required' })
		}

		const product = await Product.create({
			name,
			price,
			category_id,
			path,
			offer,
		})

		return res.status(200).json({ product })
	}

	async index(req, res) {
		const products = await Product.findAll({
			include: { association: 'category', attributes: ['id', 'name'] },
		})
		return res.json(products)
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			price: Yup.number(),
			category_id: Yup.number(),
			offer: Yup.boolean(),
		})

		try {
			await schema.validateSync(req.body, { abortEarly: false })
		} catch (error) {
			return res.status(400).json({ message: error.errors })
		}

		const { admin: isAdmin } = await User.findByPk(req.userId)
		if (!isAdmin) {
			return res.status(401).json({ message: 'Unauthorized' })
		}

		const { id } = req.params
		const product = await Product.findByPk(id)
		if (!product) {
			return res.status(404).json({ message: 'Product not found' })
		}

		const { name, price, category_id, offer } = req.body

		if (!name && !price && !category_id && !offer) {
			return res.status(400).json({ messages: 'All fields are required' })
		}

		await Product.update(
			{
				name,
				price,
				category_id,
				offer,
			},
			{
				where: { id: product.id },
			},
		)

		return res.status(200).json({ message: 'Product updated' })
	}
}

export default new ProductController()
