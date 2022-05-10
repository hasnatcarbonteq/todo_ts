import { Request, Response } from 'express';
import AuthLoginDTO from '@application/Auth/AuthLoginDTO';
import AuthRegisterDTO from '@application/Auth/AuthRegisterDTO';
import AuthService from '@application/Auth/AuthService';
// import { injectable } from 'inversify';

// @injectable()
class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request) => {
    const { email, password, username } = req.body;
    const authRegisterDTO = new AuthRegisterDTO(email, password, username);
    const result = await this.authService.register(authRegisterDTO);
    return {
      body: { status: 'success', data: result },
    };
  };

  login = async (req: Request) => {
    const { email, password } = req.body;
    const authLoginDTO = new AuthLoginDTO(email, password);

    const result = await this.authService.login(authLoginDTO);
    return {
      body: { status: 'success', data: result },
    };
  };
}

export default AuthController;
