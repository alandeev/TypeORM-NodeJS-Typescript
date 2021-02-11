import { EntityRepository, Repository } from 'typeorm';
import Perfil from '../entities/Perfil';

@EntityRepository(Perfil)
class PerfilRepository extends Repository<Perfil> {
  public async findByCpf(cpf: string): Promise<Perfil | undefined> {
    return this.findOne({
      where: { cpf }
    });
  }
}

export default PerfilRepository;
