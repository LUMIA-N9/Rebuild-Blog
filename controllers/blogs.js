const model = require('../model');

var fn_blogs = async (ctx, next) => {
    var summary = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    var blogs = [{
            id: '1',
            name: 'Test Blog',
            summary: summary,
            created_at: Date.now() - 120
        },
        {
            id: '2',
            name: 'Something New',
            summary: summary,
            created_at: Date.now() - 120
        },
        {
            id: '3',
            name: 'Learn JavaScript',
            summary: summary,
            created_at: Date.now() - 120
        },
        {
            id: '3',
            name: 'Learn JavaScript',
            summary: summary,
            created_at: Date.now() - 120
        },
        {
            id: '3',
            name: 'Learn JavaScript',
            summary: summary,
            created_at: Date.now() - 120
        }
    ];
        ctx.render('blogs.html', {
            "blogs": blogs
        });
    
};

module.exports = {
    'GET /hello/blog': fn_blogs
};
