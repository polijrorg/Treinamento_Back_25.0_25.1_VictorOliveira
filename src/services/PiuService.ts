import Piu from '../models/Piu';
import PiuRepository from '../repositories/PiuRepository';
import UserRepository from '../repositories/UserRepository';

class PiuService {
  private piuRepository: PiuRepository;
  private userRepository: UserRepository;

  constructor() {
    this.piuRepository = new PiuRepository();
    this.userRepository = new UserRepository();
  }

  public create(idUser: string, text: string): Piu | string {
    const piu = new Piu('', idUser, text, 0, 0, new Date(), new Date());

    if (text.length < 1 || text.length > 140) {
      return 'O piu precisa ter entre 1 e 140 caracteres';
    }

    const user = this.userRepository.getById(idUser);

    if (!user) {
      return 'Usuário não encontrado';
    }

    this.piuRepository.create(piu);

    return piu;
  }

  public getAll(): Piu[] {
    return this.piuRepository.getAll();
  }

  public delete(id: string): void | string {
    const piu = this.piuRepository.getById(id);

    if (!piu) {
      return 'Não foi possível encontrar o piu';
    }

    this.piuRepository.delete(id);
  }
}

export default new PiuService();
