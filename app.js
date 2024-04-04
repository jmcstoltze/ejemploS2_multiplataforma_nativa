var express = require('express')
var cors = require('cors')

var routes = require('./user/routes')

var app = express()

 // para probar en terminal y postman
/*app.get('/', (req, res) =>{
    return res.send('servidor corriendo')
})

app.listen(3000, () => {
    console.log('server running')
})
*/


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors())

app.use('/api', routes)

module.exports = app
