var express = require('express')
var controllers = require('./controller')
var upload = require('./multer_config')
var router = express.Router()

router.get('/', (req, res)=> {return res.send('ruta de prueba')})

router.post('/user', controllers.new)
router.get('/users/:last?', controllers.getUsers)
router.get('/user/:id', controllers.getUser)
router.put('/user/:id', controllers.update)
router.delete('/user/:id', controllers.delete)
router.get('/user/search/:search', controllers.search)

router.post('/user/photo/:id?', upload, controllers.upload)
router.get('/user/photo/:filename', controllers.getPhoto)

module.exports = router
