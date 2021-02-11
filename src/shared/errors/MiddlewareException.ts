import { CelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import HttpException from './HttpException';

export default (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof CelebrateError) {
    const errorBody = error.details.get('body');
    const details = errorBody?.details;
    if (!details || details.length <= 0) {
      return response.status(400).json({
        status: 'error',
        message: 'Internal error celebrate'
      });
    }

    const errorMessage = `O campo ${details[0].path[0]} ${details[0].message}`;

    return response.status(400).json({
      status: 'error',
      message: errorMessage
    });
  }

  if (error instanceof HttpException) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return response.status(400).json({
    status: 'error',
    message: 'Internal error server'
  });
};
