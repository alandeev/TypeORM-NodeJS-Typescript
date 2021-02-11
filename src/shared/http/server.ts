import 'reflect-metadata';
import '../typeorm';
import 'express-async-errors';
// import { errors } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express'; //eslint-disable-line

import routers from './routers';
import MiddlewareException from '@shared/errors/MiddlewareException';

const app = express();
app.use(express.json());

app.use(routers);
app.use(MiddlewareException);

app.listen(3333, () => console.log('Server running in the port 3333'));
