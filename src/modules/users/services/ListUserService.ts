import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';

import User from '../typeorm/entities/User'; // eslint-disable-line

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find({ relations: ['perfil'] });

    return users;
  }
}

export default ListUserService;
