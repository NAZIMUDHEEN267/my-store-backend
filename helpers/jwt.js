
const { expressjwt } = require("express-jwt");

module.exports = function () {
   const secret = process.env.SECRET_TOKEN;
   return expressjwt({
        secret,
        algorithms: ['HS512']
   }); 
}