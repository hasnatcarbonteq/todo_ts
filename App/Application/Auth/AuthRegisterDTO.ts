import Auth from '@domain/Core/Auth/Auth';
class AuthRegisterDTO {
  private readonly user: Auth;

  constructor(email: string, password: string, username: string) {
    this.user = Auth.create({ email, password, username });
  }

  getUser(): Auth {
    return this.user;
  }

  setHashPassword(hash: string): void {
    this.user.setPassword(hash);
  }
}

export default AuthRegisterDTO;
