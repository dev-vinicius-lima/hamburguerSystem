import app from './app.js'
import database from './config/database.cjs'
import { Sequelize } from 'sequelize'

const connection = new Sequelize(database)
connection
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.')
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error)
	})

app.listen(3333, () => {
	console.log('Server is running on port 3333')
})
