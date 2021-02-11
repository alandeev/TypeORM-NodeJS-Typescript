import HttpException from '@shared/errors/HttpException';
import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import PerfilRepository from '../typeorm/repositories/PerfilRepository';
import UserRepository from '../typeorm/repositories/UserRepository';

import User from '../typeorm/entities/User'; // eslint-disable-line

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  birthdate: Date;
  phone: string;
}

class CreateUserService {
  public async execute({
    name,
    cpf,
    email,
    password,
    birthdate,
    phone
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const perfilRepository = getCustomRepository(PerfilRepository);

    const emailExists = await userRepository.findByEmail(email);
    if (emailExists) {
      throw new HttpException('email already exists', 400);
    }

    const cpfExists = await perfilRepository.findByCpf(cpf);
    if (cpfExists) {
      throw new HttpException('cpf already exists', 400);
    }

    const perfilModel = perfilRepository.create({
      name,
      cpf,
      birthdate,
      phone
    });

    const passwordHashed = await bcrypt.hash(password, 8);

    const userModel = userRepository.create({
      email,
      password: passwordHashed,
      perfil: perfilModel
    });

    const user = await userRepository.save(userModel);

    return user;
  }
}

export default CreateUserService;
