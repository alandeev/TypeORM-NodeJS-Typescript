import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';

const routes = Router();

const userController = new UserController();

//Create User
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(4).max(30).required(),
      email: Joi.string().min(8).max(80).required(),
      cpf: Joi.string().min(11).max(11).required(),
      password: Joi.string().min(4).max(30).required(),
      birthdate: Joi.date().max(Date.now()).required(),
      phone: Joi.string().min(8).max(20).required()
    }
  }),
  userController.create
);

//List Users
routes.get('/', userController.index);

export default routes;
