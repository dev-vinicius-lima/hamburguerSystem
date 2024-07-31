import { Sequelize } from 'sequelize'
import configDatabse from '../config/database.cjs'
import User from '../app/models/User.js'

const models = [User]

class Database {
	constructor() {
		this.init()
	}

	init() {
		this.connection = new Sequelize({
			...configDatabse,
		})
		models.map((model) => model.init(this.connection))
	}
}

export default new Database()
