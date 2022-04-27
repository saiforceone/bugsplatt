
import {auth} from 'express-oauth2-jwt-bearer';
import * as jwt from "express-jwt";
import JwksRsa from "jwks-rsa";

export const auth0CheckJWT = auth({
  audience: process.env.AUTH0_API_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});


export const jwtCheck = jwt.expressjwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-whkdhipc.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://bugsplatt-api.io',
  issuer: 'https://dev-whkdhipc.us.auth0.com/',
  algorithms: ['RS256']
});