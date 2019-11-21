const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const {authentication, authorizationAnswer} = require('../middlewares/auth')

router.use(authentication)
router.post('/:questionId',authentication,AnswerController.create)
router.put('/:id',authentication,authorizationAnswer,AnswerController.update)
router.put('/upvote/:id',authentication,AnswerController.upvote)
router.put('/downvote/:id',authentication,AnswerController.downvote)
router.delete('/:id/:questionId',authentication,authorizationAnswer,AnswerController.delete)


module.exports =router