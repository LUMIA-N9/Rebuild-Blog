const model = require('../model');
let User = model.User;
var fn_signin = async (ctx, next) => {
    var summary = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
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
    var users = await User.findAll({
        where: {
            email: ctx.request.body.email
        }
    });
    if (users) {
        var user = JSON.parse(JSON.stringify(users[0]));
        var email = user.email;
        var password = user.passwd;
        console.log(users);
        if (ctx.request.body.email === email && ctx.request.body.password === password) {
            ctx.render('blogs.html', {
                "users": user,
                "blogs": blogs
            });
            ctx.response.redirect('/hello/blog');
            /*
                        ctx.render('signin-ok.html', {
                            title: 'Sign In OK',
                            name: 'Mr Node'
                        });*/
            console.log('hello user');
            console.log(users);
        } else {
            console.log('signin failed! Password or Email Erro!');
            ctx.render('signin-failed.html', {
                title: 'Sign In Failed'
            });
        }
    } else {
        console.log('signin failed! This email is not register!');
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed'
        });
    }
};

module.exports = {
    'POST /signin': fn_signin
};
