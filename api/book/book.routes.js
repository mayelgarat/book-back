const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const {getBooks, getBookByISBN, removeBook, addBook} =  require('./book.controller.js')
const router = express.Router()


// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBooks)
router.get('/:bookISBN', getBookByISBN)
router.post('/', requireAuth, addBook)
router.delete('/:bookISBN', requireAuth, removeBook)

module.exports = router