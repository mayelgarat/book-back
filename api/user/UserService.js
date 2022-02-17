const DBService = require('../../services/DBService')


function getUsers(criteria = {}) {
    var namePart = criteria.title || '';
    var query = `SELECT * FROM user  WHERE user.username LIKE '%${namePart}%' OR user.fullname LIKE '%${namePart}%'`;

    return DBService.runSQL(query)
}

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
    getUsers,
    getByUsername,
    add,
 
}