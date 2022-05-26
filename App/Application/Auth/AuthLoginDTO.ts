import { Request } from 'express';

class AuthLoginDTO {
  private readonly email: string;
  private readonly password: string;

  constructor(request: Request) {
    const { email, password } = request.body;
    this.email = email;
    this.password = password;
  }
  /**
   *
   * @return {string}
   */
  getEmail() {
    return this.email;
  }

  /**
   *
   * @return {string}
   */
  getPassword() {
    return this.password;
  }
}

export default AuthLoginDTO;
