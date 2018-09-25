const model = require('../model');
const blogs = require('../blogs');
const crypto = require('crypto');
const cookies = require('../cookie');
const COOKIE_NAME = 'LumiaO';
let User = model.User;
var fn_signin = async (ctx, next) => {
    var users = await User.findAll({
        where: {
            email: ctx.request.body.email
        }
    });
    if (users[0]) {
        var user = JSON.parse(JSON.stringify(users[0]));
        var email = user.email;
        var password = user.passwd;
        var sha1_passwd = `${ctx.request.body.email}:${ctx.request.body.password}`;
        if (ctx.request.body.email === email && crypto.createHash('sha1').update(sha1_passwd).digest('hex') === password) {
            console.log("user:" + user.email + " login!")
            ctx.cookies.set(
                COOKIE_NAME,
                cookies.user2cookie(user, 86400), {
                    maxAge: 86400, // cookie有效时长
                    httpOnly: true, // 是否只用于http请求中获取
                    path: '/'
                }
            )
            ctx.state.title = 'Login';
            ctx.response.redirect('/blogs');
        } else {
            console.log('signin failed! Password or Email Erro!');
            ctx.response.redirect('/blogs');
        }
    } else {
        console.log('signin failed! This email is not register!');
        ctx.response.redirect('/blogs');
    }
};

module.exports = {
    'POST /signin': fn_signin
};
