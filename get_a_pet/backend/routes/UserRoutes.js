const router = require("express").Router()

//controller
const UserController = require('../controllers/UserController')

//middleware
const checkToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', checkToken, imageUpload.single('image'), UserController.editUser)

module.exports = router