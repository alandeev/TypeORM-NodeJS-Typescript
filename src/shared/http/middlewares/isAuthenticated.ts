import { authConfig } from '@config/auth.config';
import HttpException from '@shared/errors/HttpException';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new HttpException('No token provided', 401);
  }

  const tokenSplited = authorization.split(' ');

  if (tokenSplited.length !== 2) {
    throw new HttpException('Token malformated', 401);
  }

  const [schema, token] = tokenSplited;

  if (schema !== 'Bearer') {
    throw new HttpException('Token malformated', 401);
  }

  return jwt.verify(token, authConfig.secret, async (error, decoded: any) => {
    if (error) {
      throw new HttpException('Token invalid or expired', 401);
    }

    request.user = decoded;

    return next();
  });
}
