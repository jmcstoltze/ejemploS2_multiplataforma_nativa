var express = require('express')
var controller = require('./controller')
var upload = require('./multer_config')
var router = express.Router()

router.get('/', (req, res)=> {return res.send('ruta de prueba')})

router.post('/user', controller.new)
router.get('/users/:last?', controller.getUsers)
router.get('/user/:id', controller.getUser)
router.put('/user/:id', controller.update)
router.delete('/user/:id', controller.delete)
router.get('/user/search/:search', controller.search)

router.post('/user/photo/:id?', upload, controller.upload)
router.get('/user/photo/:filename', controller.getPhoto)

module.exports = router
