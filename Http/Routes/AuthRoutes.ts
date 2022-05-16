import { Router } from 'express';
import AuthController from '../Controllers/AuthController';
import expressCallback from '@infrastructure/Utils/expressCallback';

const router = Router();

const authController = new AuthController()

router.post('/register', expressCallback(authController.register));

router.post('/login', expressCallback(authController.login));

export default router;