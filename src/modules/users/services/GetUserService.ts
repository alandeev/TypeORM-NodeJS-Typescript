import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';

import User from '../typeorm/entities/User'; // eslint-disable-line
import HttpException from '@shared/errors/HttpException';

interface IRequest {
  user_id: string;
}

class GetUserService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(user_id, {
      relations: ['perfil']
    });

    if (!user) {
      throw new HttpException('User not found', 401);
    }

    return user;
  }
}

export default GetUserService;
