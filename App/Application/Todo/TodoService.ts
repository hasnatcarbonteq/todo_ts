import TodoRepository from '@infrastructure/MySqlRepository/TodoRepository';
import CreateTodoDTO from './CreateTodoDTO';
import DeleteTodoDTO from './DeleteTodoDTO';
import FetchAllTodoDTO from './FetchAllTodoDTO';
import FetchTodoByIdDTO from './FetchTodoByIdDTO';
import UpdateTodoDTO from './UpdateTodoDTO';
import HttpError from '@infrastructure/Errors/HttpException';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async createTodo(createTodoDTO: CreateTodoDTO) {
    try {
      const newTodo = await this.todoRepository.add(createTodoDTO.getTodo());
      if (!newTodo) {
        throw new HttpError(400, 'Unable to create todo');
      }

      return newTodo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateTodo(updateTodoDTO: UpdateTodoDTO) {
    try {
      const updatedTodo = await this.todoRepository.update(
        updateTodoDTO.getUpdatedTodo(),
      );

      if (!updatedTodo) {
        throw new HttpError(400, 'Unable to update todo');
      }
      return updatedTodo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllTodos(fetchAllTodoDTO: FetchAllTodoDTO) {
    try {
      const todos = await this.todoRepository.findAll({
        paginationOptions: fetchAllTodoDTO.getPaginationOptions(),
      });
      return todos.getPaginatedData();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTodo(deleteTodoDTO: DeleteTodoDTO) {
    try {
      const deletedTodo = await this.todoRepository.delete(deleteTodoDTO.getId());
      if (!deletedTodo) {
        throw new HttpError(400, 'Unable to delete todo');
      }
      return deletedTodo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(fetchTodoByIdDTO: FetchTodoByIdDTO) {
    try {
      const todo = await this.todoRepository.findById(fetchTodoByIdDTO.getId());
      if (!todo) {
        throw new HttpError(400, 'Unable to find todo');
      }
      return todo;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TodoService;
