
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
    jwksUri: process.env.AUTH0_API_JWKS_URI
  }),
  audience: process.env.AUTH0_API_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER_BASE_URL,
  algorithms: ['RS256']
});