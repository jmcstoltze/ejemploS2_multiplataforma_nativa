var mongoose = require('mongoose')
var app =  require('./app')

var port = 3000

// mongoose.set('useFindAndModify', false)

// Depende de si es local o atlas
/*const uri = 'mongodb+srv://jmcontrerasstoltze:p0JyyARXYZhi6h78@cluster0.lyb8cgk.mongodb.net/user'*/

const uri = 'mongodb://localhost:27017/user'


// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{

mongoose.connect(uri).then(() => {

    console.log('mongo is connected')

    app.listen(port, () => {
        console.log('server is running')
    })
})
