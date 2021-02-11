import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';

import User from '../typeorm/entities/User'; // eslint-disable-line
import HttpException from '@shared/errors/HttpException';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found', 401);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Password is invalido', 401);
    }

    return user;
  }
}

export default CreateSessionService;
