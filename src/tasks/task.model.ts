import { v4 as uuidv4 } from 'uuid';

export class Task {
  id: string;
  titulo: string;
  descricao: string;
  status: 'ABERTO' |  'FEITA';

  constructor(titulo: string, descricao: string) {
    this.id = uuidv4();
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = 'ABERTO';
  }
}