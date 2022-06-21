const fs = require('fs');
const path = require('path');

const cookieLogin = (req,res,next) => {
    if(req.cookies.logado != undefined && req.session.user == null){
        let email = req.cookies.logado;

        let user = JSON.parse(fs.readFileSync(path.join('user.json'),{encoding:'utf-8'}))

        if(user.email == email){
            req.session.user = user
        }            
    };
    next();
}
    
module.exports = cookieLogin