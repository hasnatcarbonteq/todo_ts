import AuthRepository from '@infrastructure/MySqlRepository/AuthRepository';
import AuthLoginDTO from './AuthLoginDTO';
import AuthRegisterDTO from './AuthRegisterDTO';
import HttpError from '@infrastructure/Errors/HttpException';
import AuthInfraService from '@infrastructure/Services/AuthService';
import AuthGoogleClientDTO from './AuthGoogleClientDTO';
import GoogleOAuthService from '@infrastructure/Services/GoogleOAuthService';
import axios from 'axios';

class AuthService {
  private authRepository;
  private authInfraService;
  private googleAuthService: GoogleOAuthService;
  constructor() {
    this.authRepository = new AuthRepository();
    this.authInfraService = new AuthInfraService();
    this.googleAuthService = new GoogleOAuthService();
  }

  async login(authLoginDTO: AuthLoginDTO) {
    const user = await this.authRepository.findByEmail(authLoginDTO.getEmail());

    if (!user) {
      throw new HttpError(400, 'Invalid email or password');
    }

    const isValid = await this.authInfraService.verifyPassword(
      authLoginDTO.getPassword(),
      user.password,
    );
    if (!isValid) {
      throw new HttpError(400, 'Invalid email or password');
    }

    const token = await this.authInfraService.signJWT({
      id: user.id,
      email: user.email,
    });

    return { user, token };
  }

  async register(authRegisterDTO: AuthRegisterDTO) {
    try {
      const result = await this.authRepository.findByEmail(authRegisterDTO.getEmail());
      if (result) {
        throw new HttpError(400, 'Email already exists');
      }

      const hash = await this.authInfraService.hashPassword(
        authRegisterDTO.getPassword(),
      );
      authRegisterDTO.getUser().setPassword(hash);
      const user = await this.authRepository.add(authRegisterDTO.getUser());

      if (!user) {
        throw new HttpError(400, 'Unable to create user');
      }
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  getGoogleAuthUrl() {
    try {
      const url = this.googleAuthService.getGoogleAuthUrl();
      return url;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGUserData(code: string) {
    try {
      const { id_token, access_token } = await this.googleAuthService.getGoogleToken(
        code,
      );
      const user = await this.googleAuthService.getGoogleUserData({
        id_token,
        access_token,
      });
      if (!user) {
        throw new HttpError(400, 'Unable to find user');
      }
      const token = await this.authInfraService.signJWT({
        id: user.id,
        email: user.email,
      });
      return {...user, token};
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AuthService;
