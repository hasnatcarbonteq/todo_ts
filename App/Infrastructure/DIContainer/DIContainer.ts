import { container } from 'tsyringe';
import AuthService from '@application/Auth/AuthService';
import TodoService from '@application/Todo/TodoService';

container.register('AuthService', {
  useClass: AuthService,
});

container.register('TodoService', {
  useClass: TodoService,
});

export default container;