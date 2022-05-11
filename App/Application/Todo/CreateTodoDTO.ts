import Todo from '@domain/Core/Todo/Todo';
import { Request } from 'express';

class CreateTodoDTO {
  private readonly todo: Todo;
  constructor(request: Request) {
    const { title, description, status } = request.body;
    this.todo = Todo.createTodo({ title, description, status });
  }

  getTodo(): Todo {
    return this.todo;
  }
}
export default CreateTodoDTO;
