
const { expressjwt } = require("express-jwt");

module.exports = function () {
   const secret = process.env.SECRET_TOKEN;
   return expressjwt({
        secret,
        algorithms: ['HS512']
   }).unless({
      path: [
         "/api/v1/users/login",
         "/api/v1/users/signIn"
      ]
   })
}