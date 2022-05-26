import { Request } from 'express';

class DeleteTodoDTO {
  private readonly id: string;

  constructor(request: Request) {
    const { id } = request.params;
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

export default DeleteTodoDTO;
