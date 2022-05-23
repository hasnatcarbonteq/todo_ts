import models from '../Models';
const { TodoModel } = models;
import DatabaseError from '../Errors/DatabaseException';
import Todo from '@domain/Core/Todo/Todo';
import { ITodoRepository } from '@domain/Core/Todo/ITodoRepository';
import PaginationData from '@domain/Utils/PaginationData';

class TodoRepository implements ITodoRepository {
  async add(todoEntity) {
    try {
      const result = await TodoModel.create(todoEntity);
      if (!result) {
        return false;
      }
      return Todo.createTodoFromObject(result);
    } catch (e) {
      throw new DatabaseError(e);
    }
  }

  async findById(id: string) {
    try {
      const result = await TodoModel.findOne({ where: { id } });
      if (!result) {
        return false;
      }
      return Todo.createTodoFromObject(result);
    } catch (e) {
      throw new DatabaseError(e);
    }
  }

  async findAll({ paginationOptions }): Promise<PaginationData<any>> {
    try {
      const { rows: result, count } = await TodoModel.findAndCountAll({
        limit: paginationOptions.limit(),
        offset: paginationOptions.offset(),
      });

      const items = result.map((item) => Todo.createTodoFromObject(item));
      
      const paginationData = new PaginationData(paginationOptions, count, items);
      
      return paginationData;
    } catch (e) {
      throw new DatabaseError(e);
    }
  }

  async update(todoEntity) {
    try {
      const result = await TodoModel.update(todoEntity, {
        where: { id: todoEntity.id },
      });

      if (!result[0]) {
        return false;
      }
      return true;
    } catch (e) {
      throw new DatabaseError(e);
    }
  }

  async delete(id: string) {
    try {
      const result = await TodoModel.destroy({ where: { id } });
      if (!result) {
        return false;
      }
      return true;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}

export default TodoRepository;
