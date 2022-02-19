const bookService = require("./BookService.js");
const logger = require("../../services/logger.service");

async function getBooks(req, res){

 
  try {
    const books = await bookService.query();
    res.json(books);
  } catch (err) {
    logger.error('Failed to get books', err)
    res.status(500).send({ err: 'Failed to get books' })
  }
}

async function getBookByISBN(req, res) {
  
    try {
    const bookISBN = req.params.bookISBN;
    console.log('bookISBN:',bookISBN );
    
    const book = await bookService.getByISBN(bookISBN);
    res.json(book);
  } catch (err) {
    logger.error('Failed to get books', err)
    res.status(500).send({ err: 'Failed to get books' })
  }
}

async function removeBook(req, res) {
    try {
    const bookISBN = req.params.bookISBN;    
     await bookService.remove(bookISBN);
    res.send(bookISBN);
  } catch (err) {
    logger.error('Failed to remove book', err)
    res.status(500).send({ err: 'Failed to remove book' })
  }
}

async function addBook(req, res) {
    try {
  const newBook = req.body;
    const savedBook = await bookService.add(newBook);
    res.json(savedBook);
  } catch (err) {
    logger.info(err);
  }

}

async function updateBook(req, res) {
    try {
      const newBook = req.body;
    const updatedBook = await bookService.update(newBook);
    res.json(updatedBook);
  } catch (err) {
    logger.error('Failed to update book', err)
    res.status(500).send({ err: 'Failed to update book' })
  }
}

module.exports = {
  getBooks,
  getBookByISBN,
  removeBook,
  addBook,
  updateBook,
};
