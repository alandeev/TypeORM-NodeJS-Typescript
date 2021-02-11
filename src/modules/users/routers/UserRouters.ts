import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';
import { errors } from '@config/celebrate.config';

const routes = Router();

const userController = new UserController();

//Create User
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(4).max(30).required().messages(errors),
      email: Joi.string().min(8).max(80).required().messages(errors),
      cpf: Joi.string().min(11).max(11).required().messages(errors),
      password: Joi.string().min(4).max(30).required().messages(errors),
      birthdate: Joi.date().max(Date.now()).required().messages(errors),
      phone: Joi.string().min(8).max(20).required().messages(errors)
    }
  }),
  userController.create
);

//List Users
routes.get('/', userController.index);

export default routes;
