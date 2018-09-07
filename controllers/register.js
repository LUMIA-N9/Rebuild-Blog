const model = require('../model');
let User = model.User;

var fn_register = async (ctx, next) => {
    var name = ctx.request.body.email;
    
};

module.exports = {
    'POST /register': fn_register
};
