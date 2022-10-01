
const { expressjwt } = require("express-jwt");

const API_URL = process.env.API_URL;

module.exports = function () {
   const secret = process.env.SECRET_TOKEN;

   // checking the token
   const getToken = async (req, token) => {
         if(!token.payload.isAdmin) {
            return true;
         }
         return false;
   }

   return expressjwt({
      secret,
      algorithms: ['HS256'],
      isRevoked: getToken
   }).unless({
      path: [
         { url: /\/public\/uploads(.*)/, method: ["GET", "OPTIONS"] },
         { url: /\/api\/v1\/categories(.*)/, method: ["GET", "OPTIONS"] },
         {url: /\api\/v1\/products\//},
         `${API_URL}/users/login`,
         `${API_URL}/users/signIn`
      ]
   })
}
