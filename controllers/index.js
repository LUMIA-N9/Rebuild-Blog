var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        tetle: 'Welcome'
    });
};

module.exports = {
    'GET /': fn_index
};
