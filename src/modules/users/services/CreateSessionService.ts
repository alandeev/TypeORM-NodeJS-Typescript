import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import jwt from 'jsonwebtoken';

import { authConfig } from '@config/auth.config';

import HttpException from '@shared/errors/HttpException';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found', 401);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Password is invalido', 401);
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expireIn
    });

    return { token };
  }
}

export default CreateSessionService;
