const DBService = require('../../services/DBService')


function query(criteria = {}) {
    var namePart = criteria.title || '';
    var query = `SELECT * FROM book  WHERE book.title LIKE '%${namePart}%' OR book.description LIKE '%${namePart}%'`;

    return DBService.runSQL(query)
}

async function getByISBN(bookISBN) {

    var query = `SELECT * FROM book WHERE book.ISBN = ${bookISBN}`;

    var books = await DBService.runSQL(query);
    if (books.length === 1) return books[0];
    throw new Error(`book ISBN ${bookISBN} not found`);
}


function add(book) {
    var sqlCmd = `INSERT INTO book (title, description, price, author,publication_date , img ) 
                VALUES ("${book.title}",
                        "${book.description}",
                        "${book.price}",
                        "${book.author}",
                        "${book.publication_date}"
                        "${book.genre}",
                        "${book.img}")`;

    return DBService.runSQL(sqlCmd)
}


async function update(book) {
    var query = `UPDATE book set title = "${book.title}",
                                description = "${book.description}",
                                price = ${book.price}
                                author = ${book.author}
                                genre = ${book.genre}
                WHERE book._ISBN = ${book.ISBN}`;

    var okPacket = await DBService.runSQL(query);
    if (okPacket.affectedRows !== 0) return okPacket;
    throw new Error(`No book updated - book ISBN ${book.ISBN}`);
}


function remove(bookISBN) {
    console.log('bookISBN:', bookISBN);

    var query = `DELETE FROM book WHERE book.ISBN = ${bookISBN}`;

    return DBService.runSQL(query)
        .then(okPacket => okPacket.affectedRows === 1 ?
            okPacket :
            Promise.reject(new Error(`No book deleted - book ISBN ${bookISBN}`)));
}


module.exports = {
    query,
    getByISBN,
    add,
    update,
    remove
}