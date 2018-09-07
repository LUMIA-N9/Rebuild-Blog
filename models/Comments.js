const db = require('../db');

module.exports = db.defineModel('comments', {
    id: db.ID,
    blog_id: db.STRING(50),
    user_id: db.STRING(50),
    user_name: db.STRING(50),
    user_image: db.STRING(500),
    content: db.TEXT
});
