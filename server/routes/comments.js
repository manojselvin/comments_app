const express = require('express')
const router = express.Router()
const comments = require('../controllers/comments')
const auth = require('../_helpers/auth')

// GET / - Fetch All Activities
router.get('/', comments.getAll)

// GET / - Fetch Activity by column name
router.get('/column', comments.getCommentsByColumn)

// GET /:id - Fetch Activity by ID
router.get('/:id', comments.getById)

// POST / - Create new Activity
router.post('/', comments.createNew)

// PUT /:id - Update a Activity by ID
router.put('/:id', comments.updateById)

module.exports = router
