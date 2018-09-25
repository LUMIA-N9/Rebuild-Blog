var fn_index = async (ctx, next) => {
    ctx.response.redirect('/blogs');
};

module.exports = {
    'GET /': fn_index
};
