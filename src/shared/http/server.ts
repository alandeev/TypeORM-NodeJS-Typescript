import 'reflect-metadata';
import '../typeorm';
import 'express-async-errors';
import { errors } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express'; //eslint-disable-line

import routers from './routers';
import HttpException from '@shared/errors/HttpException';

const app = express();
app.use(express.json());

app.use(routers);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => { // eslint-disable-line
    if (error instanceof HttpException) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      });
    }

    console.log({
      status: 'error',
      message: error.message
    });

    return response.status(400).json({
      status: 'error',
      message: 'Internal error server'
    });
  }
);

app.listen(3333, () => console.log('Server running in the port 3333'));
