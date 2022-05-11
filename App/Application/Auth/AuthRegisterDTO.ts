import Auth from '@domain/Core/Auth/Auth';
import { Request } from 'express';

class AuthRegisterDTO {
  private readonly user: Auth;

  constructor(request: Request) {
    const { email, password, username } = request.body;
    this.user = Auth.createUser({ email, password, username });
  }

  getUser(): Auth {
    return this.user;
  }

  setHashPassword(hash: string): void {
    this.user.setPassword(hash);
  }
}

export default AuthRegisterDTO;
