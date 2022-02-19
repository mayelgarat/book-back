const DBService = require('../../services/DBService')


function query() {
    var query = `SELECT * FROM book `;
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
    remove
}