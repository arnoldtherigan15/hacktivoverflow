const User = require('../models/User')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register (req,res,next) {
        const {name,email,password} = req.body
        let tags = req.body.tags.split(',')
        User.create({name,email,tags,password})
        .then(data => {
            let name = data.name
            let email = data.email
            let tags = data.tags
            res.status(201).json({name,email,tags})
        })
        .catch(err=>{
            next(err)
        })
    }
    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user && comparePassword(password,user.password)) {
                let payload = {name:user.name,_id:user._id,email:user.email}
                let token = generateToken(payload)
                res.status(200).json({token,name:user.name,email:user.email})
            } else {
                throw {
                    msg: 'invalid email/password',
                    statusCode: 401
                }
            }
        })
        .catch(next)
    }
    static updateTag(req,res,next) {
        let tags = req.body.tags.split(',')
        let {_id} = req.loggedUser
        User.findByIdAndUpdate({ _id },{ tags })
            .then(_=>{
                res.status(201).json({ message: 'tags updated' })
            })
            .catch(next)
    }
    static getUserData(req,res,next) {
        let {_id} = req.loggedUser
        User.findById(_id)
            .then(data=>{
                res.json(data)
            })
            .catch(next)
    }

}

module.exports = UserController