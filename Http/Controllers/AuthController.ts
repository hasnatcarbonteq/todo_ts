import { Request } from 'express';
import AuthLoginDTO from '@application/Auth/AuthLoginDTO';
import AuthRegisterDTO from '@application/Auth/AuthRegisterDTO';
import AuthService from '@application/Auth/AuthService';
import AuthValidation from '@domain/Validations/AuthValidations';
import GoogleOAuthService from '@infrastructure/Services/GoogleOAuthService';
import AuthGoogleClientDTO from '@application/Auth/AuthGoogleClientDTO';

class AuthController {
  private authService: AuthService;
  private googleAuthService: GoogleOAuthService;
  constructor() {
    this.authService = new AuthService();
    this.googleAuthService = new GoogleOAuthService();
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

  googleLoginUrl = async (request: Request) => {
    const result = this.authService.getGoogleAuthUrl();
    return {
      body: { status: 'success', data: result },
    };
  };

  googleUserData = async (request: Request) => {
    const authGoogleClientDTO = new AuthGoogleClientDTO(request);
    const googleUser = await this.authService.getGUserData(
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
