import Auth from '@domain/Core/Auth/Auth';
import { Request } from 'express';

class AuthRegisterDTO {
  private readonly user: Auth;
  private readonly email: string;
  private readonly password: string;
  private readonly username: string;

  constructor(request: Request) {
    const { email, password, username } = request.body;
    const newUser = Auth.createUser({ email, password, username });
    this.user = newUser;
    this.email = newUser.email;
    this.password = newUser.password;
    this.username = newUser.username;
  }

  getUser(): Auth {
    return this.user;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getUserName(): string {
    return this.username;
  }

}

export default AuthRegisterDTO;
