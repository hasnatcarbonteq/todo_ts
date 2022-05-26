import Todo from '@domain/Core/Todo/Todo';
import { Request } from 'express';

class UpdateTodoDTO {
  private readonly todo: Todo;
  constructor(request: Request) {
    const { title, description, status } = request.body;
    const { id } = request.params;
    this.todo = Todo.createTodoFromObject({ id, title,status, description });
  }

  getUpdatedTodo(): Todo {
    return this.todo;
  }
}

export default UpdateTodoDTO;
