import { Router } from 'express';
import TodoController from '@controller/TodoController';
import auth from '../Middleware/auth';
import expressCallback from '../Utils/expressCallback';

const router = Router();

const todoController = new TodoController();

router.get('/fetch', auth, expressCallback(todoController.fetchAllTodo));

router.post('/create', auth, expressCallback(todoController.createTodo));

router.put('/update/:id', auth, expressCallback(todoController.updateTodo));

router.delete('/delete/:id', auth, expressCallback(todoController.deleteTodo));

router.get('/fetch/:id', auth, expressCallback(todoController.fetchTodoById));

export default router;
