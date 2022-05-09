import { Router } from 'express';
import TodoController from '../Controllers/TodoController';

const router = Router();

router.get('/fetch', TodoController.fetchTodo);

router.post('/create', TodoController.createTodo);

router.put('/update/:id', TodoController.updateTodo);

router.delete('/delete/:id', TodoController.deleteTodo);

router.get('/fetch/:id', TodoController.fetchTodoById);

export default router;
