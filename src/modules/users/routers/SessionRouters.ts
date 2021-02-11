import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '../controllers/SessionController';

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

export default routes;
