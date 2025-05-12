import { v4 as uuidv4 } from 'uuid';

import User from '../models/User';

class UserRepository {
  private static users: User[];

  constructor() {
    UserRepository.users = [];
  }

  public create(user: User): User {
    user.id = uuidv4();
    user.createdAt = new Date();

    const { id, cpf, name, email, password, telephone, createdAt, login } =
      user;

    const newUser = {
      id,
      cpf,
      name,
      email,
      password,
      telephone,
      createdAt,
      login,
    };

    UserRepository.users.push(newUser);

    return newUser;
  }

  public getAll(): User[] {
    return UserRepository.users;
  }

  public getByCpf(cpf: string): User | undefined {
    return UserRepository.users.find(user => user.cpf === cpf);
  }

  public findIndexById(id: string): number {
    return UserRepository.users.findIndex(user => user.id === id);
  }

  public update(
    id: string,
    name: string,
    email: string,
    password: string,
    telephone: string,
    login: string
  ): User {
    const index = this.findIndexById(id);

    login = login ? login : UserRepository.users[index].login;
    name = name ? name : UserRepository.users[index].name;
    email = email ? email : UserRepository.users[index].email;
    password = password ? password : UserRepository.users[index].password;
    telephone = telephone ? telephone : UserRepository.users[index].telephone;

    UserRepository.users[index] = {
      ...UserRepository.users[index], // mantém dados antigos
      name: name,
      email: email,
      password: password,
      telephone: telephone,
      login: login,
    };

    return UserRepository.users[index];
  }

  public delete(id: string): void {
    UserRepository.users.splice(this.findIndexById(id), 1); // remove 1 elemento na posição index
  }

  public verifyEmail(email: string): boolean {
    return (
      UserRepository.users.find(user => user.email === email) !== undefined
    );
  }

  public verifyTelephone(telephone: string): boolean {
    return (
      UserRepository.users.find(user => user.telephone === telephone) !==
      undefined
    );
  }

  public verifyCpf(cpf: string): boolean {
    return UserRepository.users.find(user => user.cpf === cpf) !== undefined;
  }

  public verifyLogin(login: string): boolean {
    return (
      UserRepository.users.find(user => user.login === login) !== undefined
    );
  }

  public getById(id: string): User | undefined {
    return UserRepository.users.find(user => user.id === id);
  }
}

export default UserRepository;
