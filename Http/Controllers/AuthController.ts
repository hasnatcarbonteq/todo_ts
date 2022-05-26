import "reflect-metadata"
import { Request } from 'express';
import AuthLoginDTO from '@application/Auth/AuthLoginDTO';
import AuthRegisterDTO from '@application/Auth/AuthRegisterDTO';
import AuthService from '@application/Auth/AuthService';
import AuthValidation from '@domain/Validations/AuthValidations';
import AuthGoogleClientDTO from '@application/Auth/AuthGoogleClientDTO';
import { injectable } from "tsyringe";
import container from '@infrastructure/DIContainer/DIContainer';

const authService = container.resolve(AuthService);

@injectable()
class AuthController {

  register = async (request: Request) => {
    AuthValidation.register(request.body);
    const authRegisterDTO = new AuthRegisterDTO(request);
    const result = await authService.register(authRegisterDTO);
    return {
      body: { status: 'success', data: result },
    };
  };

  login = async (request: Request) => {
    AuthValidation.login(request.body);
    const authLoginDTO = new AuthLoginDTO(request);
    const result = await authService.login(authLoginDTO);
    return {
      body: { status: 'success', data: result },
    };
  };

  googleLoginUrl = async (request: Request) => {
    const result = authService.getGoogleAuthUrl();
    return {
      body: { status: 'success', data: result },
    };
  };

  googleUserData = async (request: Request) => {
    const authGoogleClientDTO = new AuthGoogleClientDTO(request);
    const googleUser = await authService.getGUserData(
      authGoogleClientDTO.getCode(),
    );
    return {
      body: {
        status: 'success',
        data: googleUser,
      },
    };
  };
}

export default AuthController;
