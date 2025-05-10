class User {
  id: string;
  cpf: string;
  name: string;
  email: string;
  password: string;
  telephone: string;
  createdAt: Date;
  login: string;

  constructor(
    id: string,
    cpf: string,
    name: string,
    email: string,
    password: string,
    telephone: string,
    createdAt: Date,
    login: string
  ) {
    this.id = id;
    this.cpf = cpf;
    this.name = name;
    this.email = email;
    this.password = password;
    this.telephone = telephone;
    this.createdAt = createdAt;
    this.login = login;
  }
}

export default User;
