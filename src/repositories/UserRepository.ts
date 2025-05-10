import { v4 as uuidv4 } from 'uuid';
import User from '../models/User';

class UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
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

    this.users.push(newUser);

    return newUser;
  }

  public getAll(): User[] {
    return this.users;
  }

  public getByCpf(cpf: string): User | undefined {
    return this.users.find(user => user.cpf === cpf);
  }

  public findIndexById(id: string): number {
    return this.users.findIndex(user => user.id === id);
  }

  public update(
    id: string,
    name: string,
    email: string,
    password: string,
    telephone: string
  ): User {
    const index = this.findIndexById(id);

    name = name ? name : this.users[index].name;
    email = email ? email : this.users[index].email;
    password = password ? password : this.users[index].password;
    telephone = telephone ? telephone : this.users[index].telephone;

    this.users[index] = {
      ...this.users[index], // mantém dados antigos
      name: name,
      email: email,
      password: password,
      telephone: telephone,
    };

    return this.users[index];
  }

  public delete(id: string): void {
    this.users.splice(this.findIndexById(id), 1); // remove 1 elemento na posição index
  }

  public verifyEmail(email: string): boolean {
    return this.users.find(user => user.email === email) !== undefined;
  }

  public verifyTelephone(telephone: string): boolean {
    return this.users.find(user => user.telephone === telephone) !== undefined;
  }

  public verifyCpf(cpf: string): boolean {
    return this.users.find(user => user.cpf === cpf) !== undefined;
  }
}

export default UserRepository;
