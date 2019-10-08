const express = require('express')
const router = express.Router()
const users = require('../controllers/users')

router.post('/authenticate', users.authenticate)
router.post('/register', users.register)
router.get('/', users.getAll)
router.get('/current', users.getCurrent)
router.get('/:id', users.getById)
router.put('/:id', users.update)
router.delete('/:id', users._delete)

module.exports = router
