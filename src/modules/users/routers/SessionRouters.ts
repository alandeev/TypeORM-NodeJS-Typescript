import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '../controllers/SessionController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

import { errors } from '@config/celebrate.config';

const routes = Router();

const sessionController = new SessionController();

//authenticate router
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().min(8).max(30).required().messages(errors),
      password: Joi.string().min(4).max(30).required().messages(errors)
    }
  }),
  sessionController.authenticate
);

routes.get('', isAuthenticated, sessionController.oauth);

export default routes;
