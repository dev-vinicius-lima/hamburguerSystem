import * as Yup from 'yup'
import Product from '../models/Product.js'
import Order from '../schemas/Order.js'
import User from '../models/User.js'
class OrderController {
	async store(req, res) {
		const schema = Yup.object().shape({
			products: Yup.array()
				.required()
				.of(
					Yup.object().shape({
						id: Yup.number().required(),
						quantity: Yup.number().required(),
					}),
				),
		})

		try {
			await schema.validateSync(req.body, { abortEarly: false })
		} catch (error) {
			return res.status(400).json({ message: error.errors })
		}

		const productsId = req.body.products.map((product) => product.id)
		const updatedProducts = await Product.findAll({
			where: { id: productsId },
			include: [{ association: 'category', attributes: ['name'] }],
		})

		const editedProducts = updatedProducts.map((product) => {
			const productIndex = req.body.products.findIndex(
				(reqProduct) => reqProduct.id === product.id,
			)

			const newProduct = {
				id: product.id,
				name: product.name,
				price: product.price,
				category: product.category.name,
				url: product.url,
				quantity: req.body.products[productIndex].quantity,
			}
			return newProduct
		})
		const order = {
			user: {
				id: req.userId,
				name: req.userName,
			},
			products: editedProducts,
			status: 'pedido realizado',
		}

		console.log(order)

		const orderResponse = await Order.create(order)
		console.log(orderResponse)

		return res.status(201).json(orderResponse)
	}

	async index(req, res) {
		const orders = await Order.find()
		res.json(orders)
	}

	async update(req, res) {
		const { id } = req.params
		const { status } = req.body

		const schema = Yup.object().shape({
			status: Yup.string()
				.required()
				.oneOf([
					'Pedido realizado',
					'Em preparação',
					'Pedido Pronto',
					'Pedido à caminho',
					'entregue',
					'cancelado',
				]),
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

		try {
			await Order.updateOne({ _id: id }, { status })
		} catch (error) {
			return res.status(400).json({ error: error.message })
		}

		return res.json({ message: 'Order updated' })
	}
}

export default new OrderController()
