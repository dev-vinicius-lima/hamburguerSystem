import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
	{
		user: {
			id: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		products: [
			{
				id: {
					type: Number,
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				category: {
					type: String,
					required: true,
				},
				url: {
					type: String,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		status: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
)

export default mongoose.model('Order', OrderSchema)
