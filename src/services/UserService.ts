import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public create(
    cpf: string,
    name: string,
    email: string,
    password: string,
    telephone: string,
    login: string
  ): User | string {
    const user = new User(
      '',
      cpf,
      name,
      email,
      password,
      telephone,
      new Date(),
      login
    );

    const userRegistered = this.userRepository.getByCpf(user.cpf);

    if (userRegistered) {
      return 'Usuário já cadastrado';
    }

    this.userRepository.create(user);

    return user;
  }

  public listAll(): User[] {
    return this.userRepository.getAll();
  }

  /*
  public findById(login: string): User | undefined {
    return this.userRepository.getByLogin(login);
  }
    */

  public update(
    id: string,
    name: string,
    email: string,
    password: string,
    telephone: string,
    cpf: string,
    login: string
  ): User | string {
    if (this.userRepository.findIndexById(id) === -1) {
      return 'Usuário não encontrado';
    }

    if (email && this.userRepository.verifyEmail(email)) {
      return 'Email já cadastrado';
    }

    if (telephone && this.userRepository.verifyTelephone(telephone)) {
      return 'Telefone já cadastrado';
    }

    if (cpf && this.userRepository.verifyCpf(cpf)) {
      return 'CPF já cadastrado';
    }

    if (login && this.userRepository.verifyLogin(login)) {
      return 'Login já cadastrado';
    }

    const user = this.userRepository.update(
      id,
      name,
      email,
      password,
      telephone,
      login
    );

    return user;
  }

  public delete(id: string): boolean {
    const userIndex = this.userRepository.findIndexById(id);

    if (userIndex === -1) {
      return false;
    }

    this.userRepository.delete(id);

    return true;
  }
}

export default new UserService();
