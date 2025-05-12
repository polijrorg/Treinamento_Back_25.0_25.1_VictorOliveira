import { v4 as uuidv4 } from 'uuid';

import Piu from '../models/Piu';

class PiuRepository {
  private pius: Piu[];

  constructor() {
    this.pius = [];
  }

  public create(piu: Piu): Piu {
    piu.id = uuidv4();

    const { id, idUser, text, likes, comments, createdAt, updatedAt } = piu;

    const newPiu = {
      id,
      idUser,
      text,
      likes,
      comments,
      createdAt,
      updatedAt,
    };

    this.pius.push(newPiu);

    return newPiu;
  }

  public getAll(): Piu[] {
    return this.pius;
  }

  private findIndexById(id: string): number {
    return this.pius.findIndex(piu => piu.id === id);
  }

  public getById(id: string): Piu | undefined {
    return this.pius.find(piu => piu.id === id);
  }

  public delete(id: string): void {
    this.pius.splice(this.findIndexById(id), 1);
  }
}

export default PiuRepository;
