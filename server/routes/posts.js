const express = require('express')
const router = express.Router()
const posts = require('../controllers/posts')
const auth = require('../_helpers/auth')

// GET / - Fetch All Activities
router.get('/', posts.getAll)

// GET /:id - Fetch Activity by ID
router.get('/:id', posts.getById)

// POST / - Create new Activity
router.post('/', posts.createNew)

// PUT /:id - Update a Activity by ID
router.put('/:id', posts.updateById)

module.exports = router
