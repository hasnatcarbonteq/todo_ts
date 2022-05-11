import models from '../Models';
const { TodoModel } = models;
import DatabaseError from '../Errors/DatabaseException';
import Todo from '@domain/Core/Todo/Todo';

class TodoRepository {
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

  async findAll() {
    try {
      const result = await TodoModel.findAll();
      return result.map((todo) => Todo.createTodoFromObject(todo));
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
