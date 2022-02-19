const DBService = require('../../services/DBService')


async function getByUsername(username) {

    var query = `SELECT * FROM user WHERE user.username = "${username}"`;

    var users = await DBService.runSQL(query);
    if (users.length === 1) return users[0];
    throw new Error(`username ${username} not found`);
}


function add(user) {
    
    var sqlCmd = `INSERT INTO user (fullname, username, password ) 
                VALUES ("${user.fullname}",
                        "${user.username}",
                        "${user.password}")`;

    return DBService.runSQL(sqlCmd)
}



module.exports = {

    getByUsername,
    add,
 
}