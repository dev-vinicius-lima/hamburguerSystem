const multer = require('multer')
const { extname, resolve } = require('path')

module.exports = {
	storage: multer.diskStorage({
		destination: resolve(__dirname, '..', '..', 'uploads'),
		filename: (req, file, cb) => {
			return cb(null, `${Date.now()}${extname(file.originalname)}`)
		},
	}),
}
