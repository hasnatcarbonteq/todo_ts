import models from '@infrastructure/Models';
const { sequelize } = models;
import { Request, Response } from 'express';

class TodoController {
  static fetchTodo = async (req: Request, res: Response) => {
    res.json({
      message: 'Hello World!',
    });
  };

  static createTodo = async (req: Request, res: Response) => {
    res.json({
      message: 'Hello World!',
    });
  };

  static updateTodo = async (req: Request, res: Response) => {
    res.json({
      message: 'Hello World!',
    });
  };

  static deleteTodo = async (req: Request, res: Response) => {
    res.json({
      message: 'Hello World!',
    });
  };

  static fetchTodoById = async (req: Request, res: Response) => {
    res.json({
      message: 'Hello World!',
    });
  };
}

export default TodoController;
