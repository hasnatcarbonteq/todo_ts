import { Request } from 'express';

class FetchTodoByIdDTO {
  private readonly id: string;
  constructor(request: Request) {
    const { id } = request.params;
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

export default FetchTodoByIdDTO;