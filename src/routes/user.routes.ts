import { Router } from 'express';

import UserService from '../services/UserService';

const userRouter = Router();

userRouter.post('/', (req, res) => {
  try {
    const { cpf, name, email, password, telephone, login } = req.body;

    if (!name || !email || !password || !login || !cpf || !telephone) {
      return res.status(400).json({
        message:
          'Campos "name", "email", "password", "telephone", "login" e "cpf" são obrigatórios',
      });
    }

    const user = UserService.create(
      cpf,
      name,
      email,
      password,
      telephone,
      login
    );

    if (typeof user === 'string') {
      return res.status(400).json({
        message: user,
      });
    }

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro no servidor, tente novamente mais tarde',
    });
  }
});

userRouter.get('/', (req, res) => {
  try {
    const users = UserService.listAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro no servidor, tente novamente mais tarde',
    });
  }
});

/*
userRouter.get('/:id', (req, res) => {
  try {
    const user = UserService.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro no servidor, tente novamente mais tarde',
    });
  }
});
*/

userRouter.put('/:id', (req, res) => {
  try {
    const { name, email, password, telephone, cpf, login } = req.body;
    const id = req.params.id;

    const updatedUser = UserService.update(
      id,
      name,
      email,
      password,
      telephone,
      cpf,
      login
    );

    if (typeof updatedUser === 'string') {
      return res.status(404).json({ message: updatedUser });
    }

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro no servidor, tente novamente mais tarde',
    });
  }
});

userRouter.delete('/:id', (req, res) => {
  try {
    const deleted = UserService.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json({ message: 'Usuário deletado com sucesso!' }); // Sem conteúdo
  } catch (error) {
    return res.status(500).json({
      message: 'Erro no servidor, tente novamente mais tarde',
    });
  }
});

export default userRouter;
