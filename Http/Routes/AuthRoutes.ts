import { Router } from 'express';
import AuthController from '../Controllers/AuthController';
import expressCallback from '@infrastructure/Utils/expressCallback';

const router = Router();

const authController = new AuthController()

router.post('/register', expressCallback(authController.register));

router.post('/login', expressCallback(authController.login));

router.get('/google-login-url', expressCallback(authController.googleLoginUrl));

router.get('/google', expressCallback(authController.googleUserData));

export default router;