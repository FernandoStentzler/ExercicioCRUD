const fs = require('fs');

function logSite(req,res,next){
    fs.appendFileSync('log.txt', "O usuario entro na URL: " + req.url)
    next()
}

module.exports = logSite