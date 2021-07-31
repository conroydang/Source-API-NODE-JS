import jwt from 'jsonwebtoken';
import { ConfigParser } from '../shared';

const options: jwt.SignOptions = {
  expiresIn: '720h',
  algorithm: 'HS256'
}

export const CreateToken = (payload: object) => jwt.sign(payload, ConfigParser.config.secret, options);

export const DecodeToken = (token: string): object | null => {
  let payload = null;

  try {
    payload = jwt.verify(token, ConfigParser.config.secret, options) as object;
  } catch (err) {
    console.log(err?.message ?? err);
    payload = null;
  }

  return payload;
}