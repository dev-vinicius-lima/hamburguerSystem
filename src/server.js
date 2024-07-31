import app from '../src/app.js'
import connection from '../src/config/database.js'

connection
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.')
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err)
	})

app.listen(3333, () => {
	console.log('Server is running on port 3333')
})
