var validator = require('validator')
var User = require('./model')

var fs = require('fs')
var path = require('path')

var controllers = {
    new: (req, res) => {
        var params = req.body
        try{
            var fullnameVal = !validator.isEmpty(params.fullname)
            var emailVal = !validator.isEmpty(params.email)
        }catch(err){
            return res.status(400).send({
                status: 'error',
                message: 'Not enough data'
            })
        }

        if(fullnameVal && emailVal){
            var user = new User()
            user.fullname = params.fullname
            user.email = params.email

            if(params.photo){
                user.photo = params.photo
            }else{
                user.photo = null
            }

            user.save((err, user)=>{
                if(err || !user){
                    return res.status(404).send({
                        status: 'error',
                        message: 'Impossible to save data in database'  
                    })
                }

                return res.status(200).send({
                    status: 'success',
                    user
                })
            })
        }else{
            return res.status(400).send({
                status: 'error',
                message: 'Data is not valid'
            })
        }    
    },

    update: (req, res) =>{
        var id = req.params.id
        var params = req.body
        
        try{
            var fullnameVal = !validator.isEmpty(params.fullname)
            var emailVal = !validator.isEmpty(params.email)
        }catch(err){
            return res.status(400).send({
                status: 'error',
                message: 'Not enough data'
            })
        }

        if(fullnameVal && emailVal) {
            User.findOneAndUpdate({_id:id}, params, {new:true}, (err, user)=>{
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error while updating'
                    })
                }

                if(!user) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'User with id: '+id+' not exists'
                    })
                }

                return res.status(200).send({
                    status: 'success',
                    user
                })
            })
        }else{
            return res.status(400).send({
                status: 'error',
                message: 'Error while validating'
            })
        }
    },

    delete: (req, res) =>{
        var id = req.params.id
        User.findOneAndDelete({_id:id}), (err, user)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error while deleting'
                })
            }

            if(!user){
                return res.status(404).send({
                    status: 'error',
                    message: 'User with id: '+id+' not found'
                })
            }

            return res.status(200).send({
                status: 'success',
                user
            })
        }
    },

    getUser: (req, res) =>{
        var id = req.params.id

        if(!id || id == null){
            return res.status(400).send({
                status: 'error',
                message: 'Document _id must be provided'
            })
        }

        User.findById(id, (error, user) =>{
            if(error || !user){
                return res.status(404).send({
                    status: 'error',
                    message: 'User with id: '+id+' not found'
                })
            }

            return res.status(200).send({
                status: 'success',
                user
            })
        })
    },
    
    getUsers: (req, res) =>{
        var query = User.find({})
        var getLastUsers = req.params.last

        if(getLastUsers || getLastUsers != undefined){
            query.limit(5)
        }

        query.sort('_id').exec((err, users)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Internal server error'
                })
            }

            if(!users){
                return res.status(404).send({
                    status: 'error',
                    message: 'No users found in collection'
                })
            }

            return res.status(200).send({
                status: 'success',
                users
            })
        })
    },
    
    search: (req, res) =>{
        var search = req.params.search

        User.find({
            "$or": [
                {"email" : {"$regex": search, "$options": "i"}},
                {"fullname": {"$regex": search, "$options": "i"}}
            ]
        })
        .sort([['createdAt', 'descending']])
        .exec((err, users)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error while looking for documents'
                })
            }

            if(!users || users.length<=0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No users found with: '+search+' criteria'
                })
            }

            return res.status(200).send({
                status: 'success',
                users
            })
        })
    },

    upload: (req, res) =>{
        const file = req.file
        var id = req.params.id

        if(!file){
            return res.status(404).send({
                status: 'error',
                message: 'File cannot be empty or file ext is not allowed'
            })
        }

        var tempFilename = file.filename

        if(id){
            User.findByIdAndUpdate({_id:id}, {photo: tempFilename}, {new: true}, (err, user) =>{
                if (err || !user){
                    return res.status(400).send({
                        status: 'error',
                        message: 'Image could not be saved in document with _id: '+id
                    })
                }

                return res.status(200).send({
                    status: 'success',
                    message: 'File upload and user photo ipdated succesfully!',
                    filename: file.filename,
                    user:user
                })
            })
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'File uploaded succesfully',
                tempFilename
            })
        }
    },

    getPhoto: (req, res) =>{
        var file = req.params.filename
        var pathFile = 'uploads/' + file

        if(exists = fs.existsSync(pathFile)){
            return res.sendFile(path. resolve(pathFile))
        }else{
            return res.status(404).send({
                status: 'error',
                message: ' Image with image: '+file+ ' was not found'
            })
        }
    }
}

module.exports = controllers
