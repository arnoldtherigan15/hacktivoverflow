const router = require('express').Router()
const userRouter = require('./userRouter')
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')

router.use('/users',userRouter)
router.use('/question',questionRouter)
router.use('/answer',answerRouter)

module.exports = router