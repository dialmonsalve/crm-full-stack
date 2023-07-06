import jwt from 'jsonwebtoken';

import { TypeCreateToken } from '../types';

export const CreateToken: TypeCreateToken = (user, secret, expiresIn) => {

  const { id, email, name, lastName } = user;
  if (secret === undefined) return;
  return jwt.sign({ id, email, name, lastName }, secret, { expiresIn })

}