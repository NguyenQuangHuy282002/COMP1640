import jwt from 'jsonwebtoken';

export const generateJWToken = (payload, secret, expires) => {
  return jwt.sign(payload, secret, {
    expiresIn: expires,
  });
};

export const verifyJWTToken = (token, secret) => {
  return jwt.verify(token, secret);
};
