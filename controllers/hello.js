var model = require('../model');

let User = model.User;

var fn_hello = async (ctx, next) => {
    var users = await User.findAll({
        where: {
            name: "LUMIA"
        }       
    });
    console.log('hello user');
    console.log(users);
    if (user) {
        var user = JSON.parse(JSON.stringify(users[0]));
        ctx.render('__base__.html', {
            "users": user
        });
    }
};

module.exports = {
    'GET /hello/nav': fn_hello
};
