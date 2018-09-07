const db = require('../db');

module.exports = db.defineModel('users', {
    id: db.ID,
    email: db.STRING(50),
    passwd: db.STRING(50),
    admin: db.BOOLEAN,
    name: db.STRING(50),
    image: db.STRING(500)
});
