const config = require('./config');
const crypto = require('crypto');
const COOKIE_NAME = 'LumiaO';
const _COOKIE_KEY = config.session.secret;
const model = require('./model');
let User = model.User;


var user2cookie = function (user, max_age) {
    var expires = parseInt(new Date().getTime() + max_age).toString();
    var s = `${user.id}-${user.passwd}-${expires}-${_COOKIE_KEY}`;
    var L = [user.id, expires, crypto.createHash('sha1').update(s).digest('hex')];
    return L.join('-');
}
var cookie2user = async (cookie_str) => {
    if (cookie_str === null) {
        return null;
    }
    try {
        var L = cookie_str.split('-');
        if (L.length !== 3) {
            return null;
        }
        var uid = L[0];
        var expires = L[1];
        var sha_str = L[2];
        if (parseInt(expires) < new Date().getTime()) {
            return null;
        }
        var users = await User.findAll({
            where: {
                id: uid
            }
        });
        if (users) {
            var user = JSON.parse(JSON.stringify(users[0]));
            var s = `${user.id}-${user.passwd}-${expires}-${_COOKIE_KEY}`;
            if (sha_str !== crypto.createHash('sha1').update(s).digest('hex')) {
                console.log('Invalid sha1');
                return null;
            } else {
                user.passwd = '******';
                console.log('validate success!')
                return user;
            }
        } else {
            return null;
        }
    } catch (e) {
        console.log(e)
        return null;
    }
}
module.exports = {
    'user2cookie': user2cookie,
    'cookie2user': cookie2user
}
