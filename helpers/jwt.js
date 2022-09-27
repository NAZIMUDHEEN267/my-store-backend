
const { expressjwt } = require("express-jwt");

const API_URL = process.env.API_URL;

module.exports = function () {
   const secret = process.env.SECRET_TOKEN;
   return expressjwt({
        secret,
        algorithms: ['HS512']
   }).unless({
      path: [
         {url: /\/api\/v1\/products(.*)/, method: ["GET", "OPTIONS"]}
         ,
         {url: /\/api\/v1\/categories(.*)/, method: ["GET", "OPTIONS"]},
         `${API_URL}/users/login`,
         `${API_URL}/users/signIn`
      ]
   })
}