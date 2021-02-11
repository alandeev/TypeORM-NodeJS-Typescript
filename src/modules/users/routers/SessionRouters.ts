import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '../controllers/SessionController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const routes = Router();

const sessionController = new SessionController();

//authenticate router
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().min(8).max(30).required(),
      password: Joi.string().min(4).max(30).required()
    }
  }),
  sessionController.authenticate
);

routes.get('', isAuthenticated, sessionController.oauth);

export default routes;
