var express = require('express')
var router = express.Router()

// New Routes
const authRouter = require('../routes/authentication')
const commentRouter = require('../routes/comments')
const postRouter = require('../routes/posts')
const userRouter = require('../routes/users')

router.use('/api/authentication', authRouter)
router.use('/api/comments', commentRouter)
router.use('/users', userRouter)
router.use('/api/posts', postRouter)

module.exports = router
