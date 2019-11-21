const Answer = require('../models/Answer')
const Question = require('../models/Question')
class AnswerController {
    static create(req, res, next){
        let {description} = req.body
        let {questionId} = req.params
        let {_id} = req.loggedUser
        Answer.create({description,userId:_id})
            .then(data=>{
                // Question.findByIdAndUpdate()
                return Question.findOneAndUpdate({_id:questionId},{$push: {answerId: data._id}}, {new: true})
            })
            .then(data=>{
                res.status(201).json({message:'answer added',data})
            })
            .catch(next)
    }
    static update(req,res,next) {
        let {description} = req.body
        let {id} = req.params
        Answer.updateOne({_id:id},{description})
        .then(_=>{
            res.status(201).json({message:'answer updated'})
        })
        .catch(next)
    }
    static upvote(req,res,next) {
        let {id} = req.params
        Answer.findOne({_id:id})
        .then(result=>{
            let arrUpVotes = result.upvotes
            let arrDownVotes = result.downvotes
            if(arrUpVotes.indexOf(req.loggedUser._id) === -1) {
                arrUpVotes.push(req.loggedUser._id)
                if(arrDownVotes.indexOf(req.loggedUser._id) !== -1) {
                    arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser._id),1)
                }
            } else {
                arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser._id),1)
            }
            return Answer.updateOne({_id:id},{upvotes:arrUpVotes,downvotes:arrDownVotes})
        })
        .then(_=>{
            res.status(201).json({message:'upvote success'})
        })
        .catch(next)
    }
    static downvote(req,res,next) {
        let {id} = req.params
        Answer.findOne({_id:id})
        .then(result=>{
            let arrUpVotes = result.upvotes
            let arrDownVotes = result.downvotes
            if(arrDownVotes.indexOf(req.loggedUser._id) === -1) {
                arrDownVotes.push(req.loggedUser._id)
                if(arrUpVotes.indexOf(req.loggedUser._id) !== -1) {
                    arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser._id),1)
                }
            } else {
                arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser._id),1)
            }
            return Answer.updateOne({_id:id},{upvotes:arrUpVotes,downvotes:arrDownVotes})
        })
        .then(_=>{
            res.status(201).json({message:'downvote success'})
        })
        .catch(next)
    }
    static readOne(req,res,next) {
        let {id} = req.params
        Answer.findOne({_id:id})
        .populate('questionId')
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
    }
    static delete(req,res,next) {
        let {id} = req.params
        let {questionId} = req.params
        Answer.deleteOne({_id:id})
        .then(_=>{
            return Question.findByIdAndUpdate({_id:questionId},{$pull: {answerId:id}})
        })
        .then(_=>{
            res.status(201).json({message:'answer deleted'})
        })
        .catch(next)
    }
}

module.exports = AnswerController