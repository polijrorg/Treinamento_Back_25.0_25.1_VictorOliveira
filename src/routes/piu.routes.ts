import { Router } from 'express';

import PiuService from '../services/PiuService';

const piuRouter = Router();

piuRouter.post('/', (req, res) => {
  try {
    const { idUser, text } = req.body;

    if (!idUser || !text) {
      return res.status(400).json({
        message: 'Campos "idUser" e "text" são obrigatórios',
      });
    }

    const piu = PiuService.create(idUser, text);

    if (typeof piu === 'string') {
      return res.status(400).json({
        message: piu,
      });
    }

    return res.status(200).json(piu);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro no servidor, tente novamente mais tarde',
    });
  }
});

piuRouter.get('/', (req, res) => {
  try {
    const pius = PiuService.getAll();

    return res.status(200).json(pius);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro no servidor, tente novamente mais tarde',
    });
  }
});

piuRouter.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'O parâmetro "id" é obrigatório',
      });
    }

    const result = PiuService.delete(id);

    if (typeof result === 'string') {
      return res.status(400).json({
        message: result,
      });
    }

    return res.status(200).json({
      message: 'Piu deletado com sucesso',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro no servidor, tente novamente mais tarde',
    });
  }
});

export default piuRouter;
