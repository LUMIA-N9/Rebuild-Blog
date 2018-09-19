const model = require('../model');
const crypto = require('crypto');
const cookies = require('../cookie');
const COOKIE_NAME = 'LumiaO';
let User = model.User;

var fn_register = async (ctx, next) => {
    var name = ctx.request.body.name;
    var email = ctx.request.body.email;
    var password = ctx.request.body.password1;
    console.log(name, email, password);
    //var sha1_passwd = '%s:%s' % (uid, passwd)
    var sha1_passwd = `${email}:${password}`;
    var user = await User.create({
        name: name,
        email: email,
        passwd: crypto.createHash('sha1').update(sha1_passwd).digest('hex')
    });
    if (user) {
        var user = JSON.parse(JSON.stringify(user));
        ctx.cookies.set(
            COOKIE_NAME,
            cookies.user2cookie(user, 86400), {
                domain: 'localhost', // 写cookie所在的域名
                maxAge: 86400, // cookie有效时长
                httpOnly: true // 是否只用于http请求中获取
            }
        )
        ctx.state.user = user;
        ctx.state.title = 'Register';
        console.log('created: ' + JSON.stringify(user));
        ctx.response.redirect('/blogs');
    } else {
        ctx.response.redirect('/error')
    }

};

module.exports = {
    'POST /register': fn_register
};
