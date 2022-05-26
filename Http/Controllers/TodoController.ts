import "reflect-metadata"
import { Request } from 'express';
import CreateTodoDTO from '@application/Todo/CreateTodoDTO';
import DeleteTodoDTO from '@application/Todo/DeleteTodoDTO';
import FetchAllTodoDTO from '@application/Todo/FetchAllTodoDTO';
import FetchTodoByIdDTO from '@application/Todo/FetchTodoByIdDTO';
import UpdateTodoDTO from '@application/Todo/UpdateTodoDTO';
import TodoService from '@application/Todo/TodoService';
import TodoValidation from '@domain/Validations/TodoValidation';
import container from '@infrastructure/DIContainer/DIContainer';

const todoService = container.resolve(TodoService);

class TodoController {

  fetchAllTodo = async (request: Request) => {
    const fetchAllTodoDTO = new FetchAllTodoDTO(request);
    const results = await todoService.findAllTodos(fetchAllTodoDTO);
    return {
      body: results,
    };
  };

  createTodo = async (request: Request) => {
    TodoValidation.create(request.body);
    const createTodoDTO = new CreateTodoDTO(request);
    const result = await todoService.createTodo(createTodoDTO);
    return {
      body: { status: 'success', data: result },
    };
  };

  updateTodo = async (request: Request) => {
    TodoValidation.update(request.body);
    const updateTodoDTO = new UpdateTodoDTO(request);
    await todoService.updateTodo(updateTodoDTO);
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
    await todoService.deleteTodo(deleteTodoDTO);
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
    const result = await todoService.findById(fetchTodoByIdDTO);
    return {
      body: { status: 'success', data: result },
    };
  };
}

export default TodoController;
