const model = require('../model');
const blogs = require('../blogs');
const COOKIE_NAME = 'LumiaO';
var fn_logout = async (ctx, next) => {
    console.log('User Logout !')
    ctx.cookies.set(COOKIE_NAME, '', {
        maxAge: 0
    })
    ctx.state = {
        'title': 'Logout'
    }
    ctx.response.redirect('/blogs');
};

module.exports = {
    'GET /logout': fn_logout
};
