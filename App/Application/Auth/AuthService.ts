import AuthRepository from '@infrastructure/MySqlRepository/AuthRepository';
import AuthLoginDTO from './AuthLoginDTO';
import AuthRegisterDTO from './AuthRegisterDTO';
import HttpError from '@infrastructure/Errors/HttpException';
import AuthInfraService from '@infrastructure/Services/AuthService';

class AuthService {
  private authRepository;
  private authInfraService;
  constructor() {
    this.authRepository = new AuthRepository();
    this.authInfraService = new AuthInfraService();
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
      const result = await this.authRepository.findByEmail(
        authRegisterDTO.getUser().email,
      );
      if (result) {
        throw new HttpError(400, 'Email already exists');
      }

      const hash = await this.authInfraService.hashPassword(
        authRegisterDTO.getUser().password,
      );
      authRegisterDTO.setHashPassword(hash);
      const user = await this.authRepository.add(authRegisterDTO.getUser());

      if (!user) {
        throw new HttpError(400, 'Unable to create employee');
      }
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default AuthService;
