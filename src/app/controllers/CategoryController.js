import * as Yup from 'yup'
import Category from '../models/Category.js'
import User from '../models/User.js'

class CategoryController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
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

		const { name } = req.body
		const { fileName: path } = req.file

		const categoryExists = await Category.findOne({ where: { name } })
		if (categoryExists) {
			return res.status(400).json({ message: 'Category already exists' })
		}

		const { id } = await Category.create({ name, path })
		return res.status(200).json({ id, name })
	}

	async index(req, res) {
		const categories = await Category.findAll()
		return res.json(categories)
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
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

		const { name } = req.body
		const { id } = req.params

		const category = await Category.findByPk(id)
		if (!category) {
			return res.status(401).json({ message: 'Id the Category not found' })
		}

		let path = category.path
		if (req.file) {
			path = req.file.filename
		}

		await Category.update({ name, path }, { where: { id } })
		return res.status(200).json({ message: 'Category updated' })
	}
}

export default new CategoryController()
