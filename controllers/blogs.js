const model = require('../model');
const blogs = require('../blogs');
const cookies = require('../cookie');
const COOKIE_NAME = 'LumiaO';
var fn_blogs = async (ctx, next) => {
    var cookies_str = ctx.cookies.get(COOKIE_NAME);
    let user;
    ctx.state = {
        'title': ctx.state.title || '日志'
    };
    if (cookies_str) {
        user = await cookies.cookie2user(cookies_str);
    } else {
        user = null;
    }
    ctx.render('blogs.html', {
        "blogs": blogs,
        "users": user
    });

};

module.exports = {
    'GET /blogs': fn_blogs
};
