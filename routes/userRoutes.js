const express =  require('express')
const userController = require('../controllers/userController')
const {auth} = require('../middleware/auth')
const router = express.Router()

router.post('/register', userController.register)
router.post('/login',userController.login)
router.get('/getUserInfo',auth, userController.getUserInfo)
router.get('/getAllUser',auth,userController.getAllUser)

module.exports = router