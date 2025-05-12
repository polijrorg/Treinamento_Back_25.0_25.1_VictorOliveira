class Piu {
  id: string;
  idUser: string;
  text: string;
  likes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    idUser: string,
    text: string,
    likes: number,
    comments: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.idUser = idUser;
    this.text = text;
    this.likes = likes;
    this.comments = comments;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Piu;
