import { Request } from 'express';
import CreateTodoDTO from '@application/Todo/CreateTodoDTO';
import DeleteTodoDTO from '@application/Todo/DeleteTodoDTO';
import FetchAllTodoDTO from '@application/Todo/FetchAllTodoDTO';
import FetchTodoByIdDTO from '@application/Todo/FetchTodoByIdDTO';
import UpdateTodoDTO from '@application/Todo/UpdateTodoDTO';
import TodoService from '@application/Todo/TodoService';
import TodoValidation from '@domain/Validations/TodoValidation';

class TodoController {
  private todoService: TodoService;
  constructor() {
    this.todoService = new TodoService();
  }

  fetchTodo = async (request: Request) => {
    // const fetchTodoByIdDTO = new FetchAllTodoDTO();
    const results = await this.todoService.findAllTodos();
    return {
      body: { status: 'success', data: results },
    };
  };

  createTodo = async (request: Request) => {
    TodoValidation.create(request.body);
    const createTodoDTO = new CreateTodoDTO(request);
    const result = await this.todoService.createTodo(createTodoDTO);
    return {
      body: { status: 'success', data: result },
    };
  };

  updateTodo = async (request: Request) => {
    TodoValidation.update(request.body);
    const updateTodoDTO = new UpdateTodoDTO(request);
    await this.todoService.updateTodo(updateTodoDTO);
    return {
      body: {
        status: 'success',
        data: {
          message: 'Todo updated successfully',
        },
      },
    };
  };

  deleteTodo = async (request: Request) => {
    const deleteTodoDTO = new DeleteTodoDTO(request);
    await this.todoService.deleteTodo(deleteTodoDTO);
    return {
      body: {
        status: 'success',
        data: {
          message: 'Todo deleted successfully',
        },
      },
    };
  };

  fetchTodoById = async (request: Request) => {
    const fetchTodoByIdDTO = new FetchTodoByIdDTO(request);
    const result = await this.todoService.findById(fetchTodoByIdDTO);
    return {
      body: { status: 'success', data: result },
    };
  };
}

export default TodoController;
