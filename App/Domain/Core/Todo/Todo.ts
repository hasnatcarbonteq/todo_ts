import { uuid } from 'uuidv4';

class Todo {
  id: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(id: string, title: string, description: string, status: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
  }

  setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }

  setDeletedAT(deletedAt: Date) {
    this.deletedAt = deletedAt;
  }

  static createTodo(todoObject): Todo {
    const { title, description, status } = todoObject;
    const todo = new Todo(uuid(), title, description, status);

    if (todoObject.createdAt) {
      todo.setCreatedAt(todoObject.createdAt);
    }
    return todo;
  }

  static createTodoFromObject(todoObject): Todo {
    const { id, title, description, status } = todoObject;
    const todo = new Todo(id, title, description, status);

    return todo
  }
}

export default Todo;