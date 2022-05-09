import models from '@infrastructure/Models';
const { sequelize } = models;
import { Request, Response } from 'express';
import AuthLoginDTO from '@application/Auth/AuthLoginDTO';

class AuthController {
  static register = async (req: Request, res: Response) => {
    res.json({
      message: 'register',
    });
  };

  static login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const authLoginDTO = new AuthLoginDTO(email, password);
    res.json({
      message: 'login',
    });
  };

  static logout = async (req: Request, res: Response) => {
    res.json({
      message: 'logout',
    });
  };
}

export default AuthController;
