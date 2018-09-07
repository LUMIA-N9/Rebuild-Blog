const db = require('../db');

module.exports = db.defineModel('blogs', {
    id: db.ID,
    user_id: db.STRING(50),
    user_name: db.STRING(50),
    user_image: db.STRING(500),
    name: db.STRING(50),
    summary: db.STRING(200),
    content: db.TEXT
});
