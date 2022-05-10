import models from '../Models';
const { UserModel } = models;
import DatabaseError from '../Errors/DatabaseException';
import Auth from '@domain/Core/Auth/Auth';

class AuthRepository {
  async add(userEntity) {
    try {
      await UserModel.create(userEntity);
      return true;
    } catch (e) {
      throw new DatabaseError(e);
    }
  }

  async findByEmail(email: string) {
    try {
      const result = await UserModel.findOne({ where: { email } });
      if (!result) {
        return false;
      }
      return Auth.create(result);
    } catch (e) {
      throw new DatabaseError(e);
    }
  }
}

export default AuthRepository;
