const db = require('../db');

module.exports = db.defineModel('users', {
    email: db.STRING(50),
    passwd: db.STRING(50),
    admin: {
        type: db.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    name: db.STRING(50),
    //image: db.STRING(500)
});
