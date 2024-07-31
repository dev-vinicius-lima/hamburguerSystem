module.exports = {
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'postgres',
	database: 'burgerSystem',
	logging: false,
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
}
