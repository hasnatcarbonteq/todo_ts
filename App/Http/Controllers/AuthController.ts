import { Request } from 'express';
import AuthLoginDTO from '@application/Auth/AuthLoginDTO';
import AuthRegisterDTO from '@application/Auth/AuthRegisterDTO';
import AuthService from '@application/Auth/AuthService';
import AuthValidation from '@domain/Validations/AuthValidations';

class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  register = async (request: Request) => {
    AuthValidation.register(request.body);
    const authRegisterDTO = new AuthRegisterDTO(request);
    const result = await this.authService.register(authRegisterDTO);
    return {
      body: { status: 'success', data: result },
    };
  };

  login = async (request: Request) => {
    AuthValidation.login(request.body);
    const authLoginDTO = new AuthLoginDTO(request);
    const result = await this.authService.login(authLoginDTO);
    return {
      body: { status: 'success', data: result },
    };
  };
}

export default AuthController;
